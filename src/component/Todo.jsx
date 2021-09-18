import axios from "axios";
import { useEffect, useState } from "react";


import TodoItem from './TodoItem';

const Todo = () => {
    const [text, setText] = useState("")
   
    const [todoList, setTodoList] = useState([])
    const [Loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)

    const [totalPage, setTotalPage] = useState(1)
    
    useEffect(() => {
        getTodosList();
    },[page])
    
    const todosInstance = axios.create({
        baseURL:"http://localhost:3001"
    })

    async function getTodosList() {
    
        const res = await todosInstance.get(`/todos`, {
            params: {
                _page:  page ,
                _limit: 4,
                _sort: "title",
                _order:"asc"
           }
       })
        console.log(res);
           setTodoList(res.data)
           setLoading(false)
      
    }
    
    // todosInstance.interceptors.request.use(function (config) {
    //     console.log("inside interxeptor", config);
    //     return config;
    //   })
   

    const handleToggle = (id) => {
        
       
        fetch(`http://localhost:3001/todos/${id}`)
        .then((data) =>  data.json() )
            .then((data) => {
                
              const newData = {
                status:!data.status
                }
                
            fetch(`http://localhost:3001/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                getTodosList()
            })
        })

    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            getTodosList()
        })
        
    }

      

        return Loading ? "Loading..." :(
            <div className="BOX">   
                <h1>Simple Todo App</h1>
                <input value={text}  type="text" onChange={(e) => {
                    setText(e.target.value)
              
                }} placeholder="Write Something" />
                
                <button onClick={() => {
                  
                    const data = {
                        title: text,
                        status: false,
                    };
                    fetch("http://localhost:3001/todos", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(()=>{

                        getTodosList()
                       setText("")

                    })
                }}>+</button>

                {todoList.map((item)=>{
                    return <TodoItem key={ item.id} {...item}  handleToggle={handleToggle} handleDelete={handleDelete}/>
                })}
                <button className="page" onClick={()=>{setPage(page-1)}}>prev page</button>
                <span> page:{page}</span>
                <button className="page" onClick={()=>{setPage(page+1)}}>next page</button>
          </div>
        );
}

export default Todo
