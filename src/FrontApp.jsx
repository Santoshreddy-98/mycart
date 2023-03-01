import { useEffect, useState } from "react"
import React from 'react'
import axios from 'axios'


const FrontApp = () => {
    const [item,setItem]=useState([])
    const [newitem,setNewitem]=useState('')
    useEffect(()=>{
        axios.get("http://localhost:1007/getproducts").then(
            arr=>setItem(arr.data)
        )

    },[])
     console.log(item)
    const submitHandler=(e)=>{
       e.preventDefault(); 
       axios.post('http://localhost:1007/addproducts',{product:newitem}).then(
        arr=>setItem(arr.data)
       )
    }

    const deleteHandler = id =>{
    axios.delete(`http://localhost:1007/delete/${id}`).then(
      arr=>setItem(arr.data)
)
    }
  return (
    <center>
    <div class="card" style={{"width": "20rem","marginTop":"10px"}}>
    
     <form onSubmit={submitHandler}>
     <input type="text" value={newitem} onChange={(e)=>setNewitem(e.target.value)} placeholder="Add Products"/>
     <input type='submit' class="btn btn-success" value="submit"/>
     </form><br/>
        {item.map(task=>
        <div key={task._id}>
            {task.product}
            <span><button class="badge square-pill bg-danger" style={{"float": "right","padding":"6px 10px 6px 10px"}} onClick={()=>deleteHandler(task._id)}>x</button></span>
        </div>)}
        
      
     </div>
     </center> 
  )
}

export default FrontApp
