  import React, { useEffect, useState  } from 'react';
import { useCookies } from 'react-cookie';
import {ShoppingUseContext} from '../Contexts/Contexts'
import { NavLink } from 'react-router-dom'
import "./UserSystem.css"
const Login = () => {
  const { handleLogin , setIsLoggedIn  } = ShoppingUseContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const [loading , setLoading] = useState(false)

  console.log(cookies);
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setCookie('token', token, { path: '/' });
      handleLogin();
      setIsLoggedIn(true);
      setCookie('isLoggedIn', true, { path: '/' });
      window.localStorage.setItem('isLoggedIn', 'true');
      setLoading(true);
      window.location.href = '/';
    }
  }, []);
  



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    console.log(`clicked`);
    console.log('About to make login request...');

    try { 
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials:`include`
      }); 
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      console.log(data);
      const token = data.token;
      console.log('Token:', token);
      setCookie('token', token, { path: '/' });
      handleLogin();
      setIsLoggedIn(true);
      setCookie('isLoggedIn', true, { path: '/' });
      setLoading(false)
      window.localStorage.setItem('isLoggedIn', 'true');
      window.localStorage.setItem('token', token);
      window.location.href = `/`;
    } catch (error) {
      setLoading(false)
      setErrorMsg(error.message);
    } finally {
      setLoading(false)
    }
  };
  
  if (loading) {
    return <div className="loading">
    <span className="spinner-border" role="status" aria-hidden="true"></span>
    Loading...
    </div>;
  }
  return (
    <div>
    <form onSubmit={handleSubmit} className="user-form">
      <h1 className="form-header">Login</h1>
      <label>Email</label>
      <input type="email" placeholder="Enter ur Email" value={email} onChange={(e) => setEmail(e.target.value)} className="email"/>
      <label>Password</label>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="password"/>
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" className='sign-button'>LOGIN</button>
      <div className='signup-container'>
      <span>Dont Have Account? </span>
      <NavLink to="/SignUp" className="signUp">SignUp</NavLink>
      </div>
    </form>
      </div>
  );
};

export default Login;
