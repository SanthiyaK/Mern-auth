
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleLogout =async ()=>{
    try{
    const res=await axios.get('http://localhost:5000/api/auth/logout')
    console.log(res)
    if(res.data.status=== 200){
        localStorage.removeItem("token")
        navigate("/login")}
  }catch(error){
     console.log(error)
  }
   
}

return (
        <div className="App">
          <header className="App-header">
          <h1> HOME </h1>
          <button onClick={handleLogout}>LogOut</button>
          </header>
        </div>
);
}

/* const [tasks,setTasks]=useState([])
  useEffect(()=>{
  const fetchData=async()=>{
      const res=await axios.get('http://localhost:5000/api/property')
      setTasks(res.data)
  }
fetchData()
  },[])

  

const arryvalue= tasks.map((list,i)=>{
  return <div key={i}>{list.res}
  </div>
 })

 */ 