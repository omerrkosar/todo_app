import {useState} from 'react';
import {emailRegister,googleSignIn,signOutAuth} from '../../firebase/firebaseAuth'
import {setUser} from '../../appRedux/user'
import {useDispatch,useSelector} from 'react-redux';
import {Button,Row,Col} from 'antd';
import Register from './Register'
import SignIn from './SignIn'

export default function Auth() {
  const dispatch = useDispatch();
  const signInGoogle = () => googleSignIn().then(newUser=>dispatch(setUser(newUser)));
  const [isRegister,setIsRegister] = useState(false);
  return (
    <>
    <Row style={{marginTop:'2%'}}>
      <Col span={6}></Col>
      <Col span={12}>
        {isRegister?(<Register/>):(<SignIn/>)}
        
        <Button style={{marginTop:'2%'}} onClick={signInGoogle} type="danger" block>Google Sign In</Button>
        {isRegister?(
        <Button style={{marginTop:'2%'}} onClick={()=>setIsRegister(s=>!s)} type="primary" >Go to Sign In</Button>
        ):(
          <Button style={{marginTop:'2%'}} onClick={()=>setIsRegister(s=>!s)} type="secondary" >Go to Register</Button>
        )}
        
        </Col>
      <Col span={6}></Col>
    </Row>
    </>
  );
}