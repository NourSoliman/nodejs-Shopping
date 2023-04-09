import React , { useState, useEffect }from 'react'
import { Stack , Button } from 'react-bootstrap'
// import games from '../../data/games.json'
// import games from '../../data/Games'
// import offers from '../wowOffers/wow'
import {NavLink} from 'react-bootstrap'
import { Buffer } from 'buffer';
import currencyFormat from '../Info/currency'
import {ShoppingUseContext} from '../Contexts/Contexts'

const CartItems =  ({ _id, quantity })=> {
    console.log(`id` , _id);

    const {removeItems , allOffers } = ShoppingUseContext()
    // const [allOffers , setAllOffers] = useState([])
    // useEffect(()=>{
    //     const fetchAllOffers = async() => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/allOffers`)
    //             const data = await  response.json()
    //             setAllOffers(data)
    //             console.log('allOffers:', data);
    //             console.log(`type of all offers` , typeof allOffers);
    //         }
    //         catch(error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchAllOffers()

    // },[])
    console.log('quantity:', quantity);
    // const items = games.find((item) =>item.id === id);
    // if (items == null) return null;
    // const items = AllOffers.find((item)=> item._id === _id);
    // if (items == null ) return null
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