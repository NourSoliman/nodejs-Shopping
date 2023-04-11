import './info.css'
import { NavLink } from 'react-router-dom'
const Info = ({  name, img, alt, path }) => {
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


