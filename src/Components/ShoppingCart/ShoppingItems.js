import React from 'react'
import {  Button } from 'react-bootstrap'

import { Buffer } from 'buffer';
import currencyFormat from '../Info/currency'
import {ShoppingUseContext} from '../Contexts/Contexts'

const CartItems =  ({ _id, quantity })=> {
    console.log(`id` , _id);
    const {removeItems , allOffers } = ShoppingUseContext()
    console.log('quantity:', quantity);
    const items = allOffers.find((item) => String(item._id) === String(_id));
    console.log('items:', items);
    if (!items) return null;
    const imgData = items.img ? Buffer.from(items.img, 'base64') : null;



    return (
        <div className="d-flex align-items-center p-3" >
            <img src={`data:image/jpeg;base64,${imgData.toString('base64')}`} alt={items.alt} width="100px" height="100px"></img>
            <div className='me-5'>
                <div className='p-2'>
                    {items.name}{" "}
                    {quantity > 1 && <span className='text-muted'>x{quantity}</span>} 
                </div>
                <div className='p-1'>{currencyFormat(items.price)}</div>
                </div>
                <div>
                {currencyFormat(items.price * quantity)} {` `}
                <Button variant='outline-danger' size="sm" onClick={()=>removeItems(items._id)} >&times;</Button>
            </div>
        </div>
    )
}

export default CartItems;