import axios from 'axios';
import React, {/*  useEffect, */ useState } from 'react'
/* import axios from 'axios'; */
/* import { useNavigate } from "react-router-dom"; */


export default function ForgotPass() {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const onSubmit = async e => {
        e.preventDefault();
            try {
                await axios.post('http://localhost:5000/api/auth/forgot', { email });
                setMessage('Mail has been sent');
               
            } catch (error) {
                setMessage('');
                setMessage('An error occurred');
            }
        };
  
    return (
        <div className="auth-form">
            <h2>Forgot Password</h2><br/>
            <form onSubmit={onSubmit}>
             <input  type="text"  
                     class="form-control mb-2"
                     placeholder="Email" 
                     name="email"
                     value={email} 
                     onChange={e => setEmail(e.target.value)} 
                     required /><br />

           

        <button type="submit" class="btn btn-success mb-4">Send Email</button> <br/>
        <p className="message">{message}</p>
        
            </form>
           
        </div>
    );
};






/* window.localStorage.setItem("token", res.data.token);
 
    console.log(res.data.token) 

    useEffect(()=>{
        let token=window.localStorage.getItem("token"); 
        if(token)
        {
            navigate("/home") 
        }
        
      })  */