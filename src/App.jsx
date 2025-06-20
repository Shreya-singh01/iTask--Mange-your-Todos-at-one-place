import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'


function App() {

  const [todo, setTodo] =useState("")
  const [todos, setTodos] =useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS =(params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const togglefinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const handleEdit =(e,id) =>{
    let t =todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item =>{
      return item.id !== id;
    });
    setTodos(newtodos)
  }
  const handleDelete =(e,id) =>{
    let newtodos = todos.filter(item =>{
      return item.id !== id;
    });
    setTodos(newtodos)
    saveToLS()

  }
  const handleAdd =() =>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange =(e) =>{
    setTodo(e.target.value)
  }
  const handleCheckbox =(e) => {
    let id = e.target.name;
    let index =todos.findIndex(item =>{
      return item.id ===id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveToLS()
  }
  

  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-xl'>iTask - Mange your Todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <input type="text" onChange={handleChange} value={todo} className='w-full rounded-lg px-5 py-2' />
        <button onClick={handleAdd} disabled={todo.length<3}className='bg-violet-800 hover:bg-violet-950 p-3
         py-1 text-sm disabled:bg-violet-700 font-bold text-white rounded-md '>Save</button>
      </div>
      <input className='my-4' onChange={togglefinished} type="checkbox" checked ={showFinished}/> Show Finished
      <h2 className="text-lg font-bold">Your Todo</h2>
      <div className="todos">
        {todos.length === 0 && <div className='m5'> No Todos to display</div>}
        {todos.map(item=>{

       
        return (showFinished || !item.isCompleted) && <div key ={item.id} className="todo flex  my-3 justify-between">
          <div className='flex gap-5'>
            <input name ={item.id} onChange={handleCheckbox}type="checkbox" checked={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e) =>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
            <button onClick= {(e) =>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
          </div>
        </div>
         })}
      </div>
    </div>
    
    </>
  )
}

export default App
