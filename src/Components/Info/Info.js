import './info.css'
import currencyFormat from './currency'
import { NavLink } from 'react-router-dom'
const Info = ({ id, price, name, img, alt, path }) => {
    console.log(img);
    return (
        <div className='games-container'>
            <div className='images'>
                <img src={img} alt={alt} className="image" />
            </div>
            <div className='info-games'>
                <span className='name'>{name}</span>
            </div>
            <div className='buttons'>
                <button className='add'>
                    <NavLink to={path}>Browse all Offers</NavLink>
                </button>
            </div>
        </div>
    )
}
export default Info


/* {quantity === 0 ? <button className='add' onClick={buttons}>Add to cart</button> :
    <div>
        <div>
            <button onClick={() => decrement(id)} className="decrement">- </button>
            <span className='quantity'> {quantity} In Cart </span>
            <button onClick={() => increament(id)} className="increament">+ </button>
        </div>
        <button onClick={() => removeItems(id)} className="remove">Remove</button>
    </div>
}  */