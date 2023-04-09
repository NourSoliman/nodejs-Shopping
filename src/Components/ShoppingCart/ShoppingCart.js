// import React, { useState , useEffect } from 'react'
// import { ShoppingUseContext } from '../Contexts/Contexts'
// import ShoppingItems from './ShoppingItems'
// import { NavLink, Offcanvas, Stack , Button} from 'react-bootstrap'
// import currencyFormat from '../Info/currency'
// import CheckOut from './CheckOut'
// import Sidebar from '../Sidebar/Sidebar'
// // import games from '../../data/Games.js'
// import MoneyMethod from './MoneyMethod'
// import AllOffers from './AllOffers'
// const ShoppingCart = ({ show }) => {
//     const { cartItems, closeCart } = ShoppingUseContext()
//     return (
//         <div >
//             </div>
//     )
// }
// export default ShoppingCart

        // <Offcanvas show={show} onHide={closeCart} placement="end">
        //     <Offcanvas.Header closeButton>
        //         <Offcanvas.Title>Cart</Offcanvas.Title>
        //     </Offcanvas.Header>
        //     <Offcanvas.Body>
        //         <Stack gap={2}>
        //             {cartItems.map((item) => (
        //                 <ShoppingItems key={item.id} {...item} />
        //             ))}
        //             {currencyFormat(
        //                 cartItems.reduce((total, cart) => {
        //                     const items = AllOffers.find((i) => i.id === cart.id);
        //                     return total + (items?.price || 0) * cart.quantity
        //                 }, 0)
        //             )}
        //         </Stack>
        //     </Offcanvas.Body>
        // </Offcanvas>