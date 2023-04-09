import React from 'react'
import video from '../../Images/highqualityBG.mp4'
import { NavLink } from 'react-router-dom'
import './New.css'
import { ShoppingUseContext  } from '../Contexts/Contexts'

const NewHome = () => {
    const {  isLoggedIn  } = ShoppingUseContext()
    return (
        <div className='home-main'>
            <div className='video-overlay'>
            <video src={video} autoPlay loop muted type="video/mp4" className='video' />
            </div>
            <div className='content'>
                <h1>Dragon Games</h1>
                <p>Your Best Choice</p>
            <div >
                {isLoggedIn ? (
                    <button className='button'><NavLink to="/Games" className='main-button'>Check Our Games</NavLink></button>
                    ) :  <button className='button'><NavLink to="/login" className='main-button'>Please Login First</NavLink></button>}
            </div>
            </div>
        </div>
    )
}

export default NewHome