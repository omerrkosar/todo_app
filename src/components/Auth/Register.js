import {emailRegister} from '../../firebase/firebaseAuth'
import {setUser} from '../../appRedux/user'
import {useDispatch} from 'react-redux';
import {Button,Form,Input} from 'antd';
export default function Register() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const registerEmail = (email,password)=>emailRegister(email,password).then(newUser=>dispatch(setUser(newUser)));
  
  const handleFinishForm = (values) => {
    if(values.password==values.password2)
    registerEmail(values.email,values.password);
  }

  return (
      <>
        <Form form={form} onFinish={handleFinishForm}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
          </Form.Item>
          <Form.Item label="Password(Again)" name="password2" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
          </Form.Item>
        </Form>
        <Button onClick={()=>form.submit()} block type="primary" >Register</Button>
      </>
  );
}