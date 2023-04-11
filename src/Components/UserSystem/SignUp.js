import React , {useState , useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {ShoppingUseContext} from '../Contexts/Contexts'
import { NavLink } from 'react-router-dom'

 const SignUp = () => {
  const {  isLoggedIn  } = ShoppingUseContext();
    const [userName , setUserName] = useState(``)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [cookies , setCookie] = useCookies([`token`])
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      if (cookies.token || isLoggedIn) {
        console.log('Redirecting to home page');
        setLoading(true)
        window.location.href = '/';
        // navigate(`/`);
        return;
      }
    }, [cookies.token , isLoggedIn]);
    const handleSubmit = async ( event ) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            setErrorMsg(`Passwords not Match`)
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/signUp`, {
                method:`POST`,
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password , confirmPassword , userName }),
                credentials: 'include',
            })
            const data = await response.json()
            const token = data.token
            // Save the token to local storage and redirect user to homepage after successful signup
            setCookie(`token` , token , {path:`/login`});
            navigate(`/login`)
            console.log(`from signup`,response);
            console.log(`from signup`,data);
        }   
        catch(error) {
            setErrorMsg(error.response.data.error)
        }
        finally{
          setLoading(false);
        }
      }
      if (loading) {
        return <div className="loading">
        <span className="spinner-border" role="status" aria-hidden="true"></span>
        Loading...
        </div>;
      }
    
  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h1 className='form-header'>SignUp</h1>
    <label>UserName</label>
    <input type="text" placeholder='Write ur Name' value={userName} onChange={(e) =>setUserName(e.target.value)}></input>
    <label>Email</label>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <label>Password</label>
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <label>confirmPassword</label>
    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    {errorMsg && <p className='error-sign'>{errorMsg}</p>}
    <button type="submit">Sign up</button>
    <div className='signup-container'>
      <span>Already have Account? </span>
      <NavLink to="/login" className="signUp">LOGIN</NavLink>
      </div>
    </form>
  )
}
export default SignUp