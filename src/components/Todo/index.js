import {useEffect, useState} from 'react';
import {getTodos,insertTodo,deleteTodo,updateTodo} from '../../firebase/firebaseTodo'
import {useSelector} from 'react-redux';
import {Table,Button} from 'antd';
import TodoModal from './TodoModal'
export default function Todo() {
  const user = useSelector(state=>state.user.user);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [todos,setTodos] = useState([]);
  const [selectedTodo,setSelectedTodo] = useState();
  const getTodosUser = () => getTodos(user.uid).then(newTodos=>{
    console.log(newTodos);
    setTodos(newTodos)
  });


  const editTodo = (todo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  }

  const addTodo = () => {
    setSelectedTodo(null);
    setIsModalVisible(true);
  }

  const removeTodo = (id) => {
    deleteTodo(id).then(() =>{
      setTodos(st=>st.filter(item=>item.id!=id))
    }).catch((err)=>alert(err))
  }
  
  const handleFinishModal = (values) => {
    if(selectedTodo){
      updateTodo(values,selectedTodo.id).then(()=>{
        setTodos(st=>[...st.filter(item=>item.id!=selectedTodo.id),{...values,id:selectedTodo.id}])
      }).catch((err)=>alert(err))
    }
    else {
      insertTodo(values).then(todo=>{
        setTodos(st=>[...st,todo]);
      })
    }
    
    setIsModalVisible(false);
  }
  useEffect(()=>{
    getTodosUser();
  },[]);

  const columns = [
    {
      title:'Title',
      dataIndex:'title',
      key:'title'
    },{
      title:'Note',
      dataIndex:'note',
      key:'note'
    },
    {
      title: 'Remove',
      key: 'remove',
      dataIndex: 'remove',
      render: (text, record) => (
       <Button type="danger" onClick={()=> removeTodo(record.id)}>
         Remove
       </Button>
      ),
    },
    {
      title: 'Edit',
      key: 'edit',
      dataIndex: 'edit',
      render: (text, record) => (
       <Button type="primary" onClick={()=> editTodo(record)}>
         Edit
       </Button>
      ),
    },
  ]
  return (
  <>
    <Table dataSource={todos} columns={columns} />
    <Button type="primary" onClick={addTodo} >Add Todo</Button>
    <TodoModal handleFinishModal={handleFinishModal} isModalVisible={isModalVisible} closeModal={()=>setIsModalVisible(false)} todo={selectedTodo}/>
  </>
  );
}