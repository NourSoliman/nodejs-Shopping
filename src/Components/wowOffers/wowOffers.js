import React , {useState, useEffect} from 'react'
import WowGold from './wow'
import WowOffer from './WowOffer'
import Sidebar from '../Sidebar/Sidebar'
import { ShoppingUseContext } from '../Contexts/Contexts'

const WowOffers = () => {
    const [wowcoins , setWowCoins] = useState([])
    const [loading , setLoading] = useState(true) 
    const {search} = ShoppingUseContext()
    useEffect(()=>{
        const fetchWowOffers = async() => {
            try{
                const token = localStorage.getItem(`token`)
                const response = await fetch(`http://localhost:5000/api/wowOffer` , {
                    method:"GET",
                    headers: {
                        'Authorization': `Bearer ${token}` // include the token in the headers
                    }
                });
                const data = await response.json()
                console.log(data);
                setWowCoins(data)
                setLoading(false)
            } 
            catch(error) {
                console.log(`error Fetching wow offers`  ,error);
            }
        }
        fetchWowOffers()
    },[])
    return (
        <div className='main'>
            <Sidebar search={search}/>
            <div className='container'>

            {loading ? 
            <p className="loading">
            <span className="spinner-border" role="status" aria-hidden="true"></span>
            Loading...
            </p>
            :wowcoins.map((item) => (
                <div key={item._id}>
                    <WowOffer {...item}/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default WowOffers