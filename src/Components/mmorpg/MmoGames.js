import React from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingUseContext } from '../Contexts/Contexts'
const MmoGames =({id , name , img , price , alt , path}) => {
  const {  gamesQuantity, increament, decrement, removeItems  } = ShoppingUseContext()
  const quantity = gamesQuantity(id)
  return (
    <div className='games-container'>
        <div className='images'>
            <img src={img} alt={alt} className="image" />
        </div>
        <div className='games-info'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <div className='buttons'>
                <button className='add'>
                    <NavLink to={path}>Browse all Offers</NavLink>
                </button>
            </div>
    </div>
  )
}

export default MmoGames