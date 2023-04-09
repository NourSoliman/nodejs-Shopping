import React from 'react'
import { ShoppingUseContext } from '../Contexts/Contexts'
import currencyFormat from '../Info/currency'
import {HiPlusSm , HiMinusSm} from 'react-icons/hi'
const NeverWinter = ({id , img , alt , price , name}) => {
    const {  gamesQuantity, increament, decrement, removeItems } = ShoppingUseContext()
    const quantity = gamesQuantity(id)
    return (
            <div className='games-container'>
                <div className='images'>
                    <img  src={img} alt={alt} className="image"/>
                </div>
                <div className='games-info'>
                    <span className='name'>{name}</span>
                    <span className='price'>{currencyFormat(price)}</span>
                </div>
                <div className='buttons'>
                    {quantity === 0 ? <button className='add' onClick={()=>increament(id)}>Add To Cart </button> : 
                    <div>
                        <div>
                            <button className='increament' onClick={()=>increament(id)}> <HiPlusSm /></button>
                            <span>{quantity} In Cart</span>
                            <button className='decrement' onClick={()=>decrement(id)}><HiMinusSm /></button>
                        </div>
                        <button className='remove' onClick={()=>removeItems(id)}>Remove</button>
                    </div>}
                </div>
            </div>
    )
}

export default NeverWinter