import logo1 from '../../../src/logo2.png'
import { FaBars } from 'react-icons/fa'
import { BsCart3 } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { ShoppingUseContext } from '../Contexts/Contexts'
import { useState, useEffect } from 'react'
import LogOut from '../UserSystem/Logout'
import { useCookies } from 'react-cookie';


const Nav = () => {
  const [cookies] = useCookies(['token']);
  const [toggle, setToggle] = useState(false)
  const [username, setUsername] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartQuantity, isLoggedIn } = ShoppingUseContext()

  console.log(`isloggedin`, isLoggedIn);
  const dropMenu = () => {
    setToggle(!toggle)
  }
  const dropUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUserName', {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        const data = await response.json();
        setUsername(data.username);
        console.log('username:', data.username);
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn) {
      getUserName();
    }
  }, [isLoggedIn, cookies.token]);

  return (
    <div className="nav">
      <div className="logo1">
        <img src={logo1} alt="logo" width="75px" height="75px" className="logo" />
        <NavLink to="/" className="header">
          <h1>DragonGames</h1>
        </NavLink>
      </div>
      <div className={toggle ? 'links toggle' : 'links'}>
        <i className="icon" onClick={dropMenu}>
          <FaBars size="30px" />
        </i>
        <ul className='first-list'>
          {isLoggedIn ? (
            <>
              <li className="link">
                <NavLink to="/" className="navlink" onClick={dropMenu}>
                  Home
                </NavLink>
              </li>
              <li className="link">
                <NavLink to="/Games" className="navlink" onClick={dropMenu}>
                  Games
                </NavLink>
              </li>
              
              <ul className='link username'>
                <button onClick={dropUserMenu} className="username-button">{username}</button>
                {userMenuOpen && (
                  
                  <ul className="username-menu">
                    <li>
                      <NavLink to="/Cart" className="cart-link" onClick={dropMenu}>
                        <BsCart3 size="30px" />
                        <span className="number">{cartQuantity}</span>
                      </NavLink>
                    <li>
                      <LogOut />
                    </li>
                    </li>
                  </ul>
                  
                )
                }
              </ul>
            </>
          ) : (
            <>
              <li className="link">
                <NavLink to="/login" className="navlink">
                  Login
                </NavLink>
              </li>
              <li className="link">
                <NavLink to="/SignUp" className="navlink">
                  SignUp
                </NavLink>
              </li>
            </>
          )}
          <li className="li-close">
            <button className="closeButton" onClick={dropMenu}>
              &times;
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Nav
