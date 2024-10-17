
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Logout from './Logout';



export default function Home() {

  const [tasks,setTasks]=useState([])
  useEffect(()=>{
  const fetchData=async()=>{
   
      const res=await axios.get('http://localhost:5000/api/property',{
        withCredentials: true
      })
      setTasks(res.data)
  }
fetchData()
  },[])

      
      const arryvalue= tasks.map((list,i)=>{
          return <div key={i}>{list.title}
          </div>
        })
       
return (
        <div className="App">
          <header className="App-header">
          
          <h1> HOME </h1>
          {arryvalue}
        <Logout />
          </header>
        </div>
);
}
