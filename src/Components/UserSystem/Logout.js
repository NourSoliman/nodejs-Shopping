
import React  from 'react'
import { useCookies } from 'react-cookie';
import {ShoppingUseContext} from '../Contexts/Contexts'

function Logout() {
    const [cookies,  removeCookie] = useCookies(['token']);
    const {  handleLogoutContext  } = ShoppingUseContext();
    const handleLogOut = ( ) => {
        fetch('/api/logout', {
            method:`POST`,
            headers:{
                Authorization: `Bearer ${cookies.token}`
            }   
        })
        .then(response => {
            console.log(response);
            removeCookie('token', { path: '/' });
            localStorage.removeItem('token');
            handleLogoutContext();
        })
        .catch(error =>{
            console.log(error);
        })
    }
  return (
    <button onClick={handleLogOut} className="username-button">Logout</button>
  )
}

export default Logout