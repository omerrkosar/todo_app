import React from 'react'
import {app,db} from './firebase/firebaseConfig'
import {signOutAuth} from './firebase/firebaseAuth'
import {Button,Row,Col} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './appRedux/user'
import Auth from './components/Auth'
import Todo from './components/Todo'

import "antd/dist/antd.css";

function App() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  
  const signOut = () => signOutAuth().then(newUser=>dispatch(setUser(newUser)));

  return (
    <>
    {user?(
    <Row style={{marginTop:'2%'}}>
      <Col span={6}></Col>
      <Col span={12}>
        <Button onClick={signOut} type="danger" block>Sign Out</Button>
        <Todo/>
        </Col>
      <Col span={6}></Col>
    </Row>
    ):(
      <Auth/>
    )}



    </>

  );
}

export default App;
