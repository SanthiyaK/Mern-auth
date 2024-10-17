import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const {token}=useParams()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(''); // Clear any previous error messages

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset/${token}`, { password });
            console.log(response.data)
            setMessage("Password has been reset successfully"); // Display success message
        } catch (error) {
            setMessage(''); // Clear success message
            setError('Error resetting password');
        }
    };

    return (
        <div>
        <h2>Reset Password</h2><br/>
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                value={password} 
                 class="form-control mb-2"
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter new password"
                required 
            />
            <br/>
            <input 
                type="password" 
                value={confirmPassword} 
                 class="form-control mb-2"
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm new password"
                required 
            />
            <br/> 
            <button type="submit" class="btn btn-success">Reset Password</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        </div>
    );
};

export default ResetPassword;
