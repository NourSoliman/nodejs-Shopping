import React from 'react'
import { ShoppingUseContext } from '../Contexts/Contexts'
import {HiPlusSm , HiMinusSm} from 'react-icons/hi'
import currencyFormat from '../Info/currency'
import {Buffer} from 'buffer'
const AlbionOffers = ({_id , name , price , img , alt }) => {
    const {  gamesQuantity, increament, decrement, removeItems } = ShoppingUseContext()
    const quantity = gamesQuantity(_id)
    const imgSrc = img ?  Buffer.from(img.data).toString(`base64`) : ``
    return (
        <div className='games-container'>
            <div className='images'>
                <img  src={`data:${img.contentType};base64,${imgSrc}`} alt={alt} className="image"/>
            </div>
            <div className='games-info'>
                <span className='name'>{name}</span>
                <span className='price'>{currencyFormat(price)}</span>
            </div>
            <div className='buttons'>
                {quantity === 0 ? <button className='add' onClick={()=>increament(_id)}>Add To Cart </button> : 
                <div>
                    <div>
                        <button className='increament' onClick={()=>increament(_id)}> <HiPlusSm /></button>
                        <span>{quantity} In Cart</span>
                        <button className='decrement' onClick={()=>decrement(_id)}><HiMinusSm /></button>
                    </div>
                    <button className='remove' onClick={()=>removeItems(_id)}>Remove</button>
                </div>}
            </div>
        </div>
    )
}

export default AlbionOffers