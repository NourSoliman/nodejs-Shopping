import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { ShoppingUseContext } from '../Contexts/Contexts'
import ShoppingItems from './ShoppingItems'
import MoneyMethod from './MoneyMethod'
import currencyFormat from '../Info/currency'
import './CheckOut.css'
const CheckOut = () => {
    const { cartItems , allOffers  } = ShoppingUseContext()
    return (
        <div className='main'>
            <Sidebar />
            <div className='items-container'>
            <div>
                <h5>Shopping Cart</h5>
            </div>
            <div className='cart-items'>
                {cartItems.map((item)=> (
                    <ShoppingItems {...item} key={item._id}/>
                ))}
                {allOffers.length > 0 && 
                currencyFormat(cartItems.reduce((total , cart)=>{
                    const items = allOffers.find((i) => i._id === cart._id);
                    return  total + (items?.price || 0) * cart.quantity
                },0))}
            </div>
            <div>
                <MoneyMethod />
            </div>
            </div>
            </div>
    )
}

export default CheckOut