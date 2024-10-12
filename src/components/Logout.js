
import axios from 'axios';
import React  from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout =async ()=>{
    try{
    const res=await axios.get('http://localhost:5000/api/auth/logout',{
      withCredentials: true
    })
    console.log(res)
    if(res.request.status=== 200){
        window.localStorage.removeItem("token")
       /*  window.localStorage.setItem("auth", false); */
        navigate("/login")}
  }catch(error){
     console.log(error)
  }
}

return (
        <div className="App">
          <header className="App-header">
         
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