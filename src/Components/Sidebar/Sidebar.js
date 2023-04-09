import '../Sidebar/Sidebar.css'
import React, { useState } from 'react'
import {CgGames} from 'react-icons/cg'
import sideIcon from '../../Images/side-icon.png'
import {DiUnitySmall} from 'react-icons/di'
import {MdOutlineGames} from 'react-icons/md'
import {SiYoutubegaming , SiEpicgames} from 'react-icons/si'
import { ShoppingUseContext } from '../Contexts/Contexts'
import {AiOutlineSearch} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    const [open , setOpen] = useState(false)
    const {searching} = ShoppingUseContext()
    const toggle = () => {
        setOpen(!open)
    }
    return (
        <div className='sidebar'>
            <div className='side-bar' style={{width: open ? "200px" : "50px" }}>
            <img src={sideIcon} alt="sice-icon" className='side-icon' onClick={()=>toggle()} style={{rotate:open?"180deg":null}} />
            <div className='side-header'>
                <CgGames size="30px" color='white'/>
                <h4 style={{display: open? null : "none"}}>Dragon Games</h4>
            </div>
            <div>
                <ul className='games-ul'>
                    <li className='side-link'>
                        <span><AiOutlineSearch size="20px" color='white' onClick={()=>toggle()} /></span>
                        <input type="text" placeholder='Search...' className='sidebar-search' onChange={(e)=>searching(e)} style={{display: open? null : "none"}}></input>
                        </li>
                    <li >
                        <DiUnitySmall size="20px"  />
                    <span  style={{display: open? null : "none" }} >
                        <NavLink to="/Games" >All Games</NavLink></span>
                        </li>
                    <li><SiYoutubegaming /><span  style={{display: open? null : "none"}}>
                        <NavLink to="/Mmorpg" className="mmo-nav">MMORPG Games</NavLink>
                        </span>
                        </li>
                    <li><SiEpicgames /><span  style={{display: open? null : "none"}}>
                        <NavLink to="/RPG">RPG Games</NavLink>
                        </span>
                        </li>
                    <li><MdOutlineGames size="20px"/>
                    <span  style={{display: open? null : "none"}}>
                        <NavLink to="/FPS">FPS Games</NavLink>
                        </span>
                        </li>
                </ul>
            </div>
            </div>
        </div>
    )
}
export default Sidebar
