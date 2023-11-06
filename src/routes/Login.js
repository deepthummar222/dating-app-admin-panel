import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let sessionData = sessionStorage.getItem('token');
    if (sessionData !== null) {
      navigate('/starter');
    }
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
     
      const requestBody = {
        mobileNumber: mobileNumber,
        password: password,
      };
  
      // Retrieve the access token from session storage
      const token = sessionStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL_1;
      console.log("apiUrl:::::",apiUrl)
      const url = apiUrl;
      const response = await fetch(`${url}/api/v1/admin/auth/login`,{
        method: 'POST',
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(requestBody),
      });
      console.log("response.data",response.data);
  
      if (response.ok) {
        const data = await response.json();
  
        if (data && data.data && data.data.tokens && data.data.tokens.access) {
          const token = data.data.tokens.access.token;
  
          sessionStorage.setItem('token', token);
  
          toast.success('Login Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
  
          setTimeout(() => {
            navigate('/starter');
          }, 3000);
        } else {
          toast.error('Invalid response from the server', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error('Invalid Mobile Number or Password', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error('Error:', error);
  
      // Handle errors gracefully
      toast.error('An error occurred during login', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeader">Login</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="loginInput"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="loginInput"
          />
        </div>
        <div>
          <button type="submit" className="loginButton">
            Login
          </button>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
//7698387947
//deepTheAdmin@123
export default LoginPage;
