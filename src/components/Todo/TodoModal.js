import {useEffect} from 'react';
import {Modal,Form,Button,Input,Checkbox} from 'antd';


export default function TodoModal({isModalVisible,closeModal,handleFinishModal,todo}){
  const [form] = Form.useForm();

  useEffect(()=>{
    if(todo!=null)
    {
      form.setFieldsValue(todo);
    }
    else {
      form.resetFields();
    };
  },[todo])
  const handleFinish = (values) => {
    form.resetFields();
    Object.keys(values).forEach(key =>{
      if(values[key]==undefined)values[key] = false;
    })
    handleFinishModal(values);
  }
  
  return (
    <>
      <Modal visible={isModalVisible} onCancel={closeModal} 
      footer={[
        <>
          <Button onClick={closeModal} type="secondary">Close</Button>
          <Button onClick={()=>form.submit()} type="primary">Save</Button>
          </>
      ]}
      >
          <Form form={form} onFinish={handleFinish}>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Note" name="note" rules={[{ required: true, message: 'Please input your note!' }]}>
                    <Input.TextArea/>
            </Form.Item>
              
            
            <Form.Item label="Finished"  name="finished" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Form>

      </Modal>
    </>
  );


}