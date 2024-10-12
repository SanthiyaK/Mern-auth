import {
    Outlet,
   Navigate, 
   
} from 'react-router-dom'

export default function ProtectedRoutes() {
    let token=window.localStorage.getItem("token");    
    return (
      token ?
        <Outlet /> : <Navigate to="/login" />
    )
  
}


