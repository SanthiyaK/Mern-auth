import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({  email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate()
    const onChange = e => setFormData({ ...formData, 
                                      [e.target.name]: e.target.value });
     axios.defaults.withCredentials=true; 

    const onSubmit = async e => {
        e.preventDefault();
        try {
          const res= await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            console.log(res)
            if(res.request.statusText=== "OK"){
                navigate("/home")
            }
        } catch (err) {
            alert("You are not registered to this service")
            navigate("/")   
        }
    };
  
    return (
        <div className="auth-form">
            <h2>Login Form</h2><br/>
            <form onSubmit={onSubmit}>
             <input  type="text"  
                     class="form-control mb-2"
                     placeholder="Email" 
                     name="email"
                     value={email} 
                     onChange={onChange} 
                     required /><br />

            <input   type="password"  
                     class="form-control mb-2" 
                     placeholder="Password"
                     name="password"
                     value={password}
                     onChange={onChange} 
                     required /><br/>

            <button type="submit" class="btn btn-success mb-4">Login</button>
           
        
            </form>
           
        </div>
    );
};






