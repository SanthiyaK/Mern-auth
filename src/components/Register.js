import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState();
    
    const { email, password } = formData;
    
    const onChange = e => setFormData({ ...formData, 
                                      [e.target.name]: e.target.value });
    
        const onSubmit = async e => {
        e.preventDefault();
        try {
           await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password
            });
            setMessage('Registered successfully'); 
        } catch (err) {
           
            setMessage("Registration is invalid");
        }
    };

    return (
        <div className="auth-form">
            <h2>Register/SignUp</h2><br/>
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

            <button type="submit" class="btn btn-success mb-4">Register</button>
            <p className="message">{message}</p>
          <Link  to="/login">  Sign In  </Link> <p>  If already have account{" "}</p>
            </form>
           
        </div>
    );
};






