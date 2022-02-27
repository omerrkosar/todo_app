import {emailSignIn} from '../../firebase/firebaseAuth'
import {setUser} from '../../appRedux/user'
import {useDispatch} from 'react-redux';
import {Button,Form,Input} from 'antd';
export default function SignIn() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const signInEmail = (email,password)=>emailSignIn(email,password).then(newUser=>dispatch(setUser(newUser)));
  
  const handleFinishForm = (values) => {
    signInEmail(values.email,values.password);
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
        </Form>
        <Button onClick={()=>form.submit()} block type="primary" >Sign In</Button>
      </>
  );
}