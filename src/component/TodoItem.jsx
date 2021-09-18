import React from "react"


const TodoItem=({ title,id,status,handleDelete,handleToggle }) => {
  
  const handleDeleteFn = () => {
    handleDelete(id)
  }

  const handleToggleFn = () => {
    handleToggle(id) 
    
  }
  var style1;
  
    if (status)
    {
      style1 = {
        background: "green",
        textDecoration: "line-through"
        }
      
    }
    else
    {
      style1 = {
        background:"red"
        }
      
    }
    
  
      return (
        <div className="tasks" style={style1}>
            <div className="div1" onClick={handleToggleFn}  > {title }{status? "":": not Done" }</div>
            <div className="div2">
              <button onClick={handleDeleteFn} className="remove">✖</button>
            </div> 
       </div>
   )
}

export default TodoItem

