import React , {useState , useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AlbionGold from './AlbionGold'
import AlbionOffers from './AlbionOffers'
const Albion = ()=> {
    const [albioncoins , setAlbionCoins] = useState([])
    const [loading , setLoading] = useState(true)
    useEffect(()=>{
        const fetchAlbionOffers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/albionOffer`, {
                    method:`GET`,
                    headers: {
                        'Authorization': `Bearer ${token}` // include the token in the headers
                    }
                })
                const data = await response.json()
                setAlbionCoins(data)
                setLoading(false)
            }
            catch(error) {
                console.log(`error fetching albion offers` , error);
            }
        }
        fetchAlbionOffers()
    },[])
    return (
        <div className='main'>
            <Sidebar />
            <div className='container'>
                {loading ? 
                            <p className="loading">
                            <span className="spinner-border" role="status" aria-hidden="true"></span>
                            Loading...
                            </p>
                : albioncoins.map((item) => (
                    <div key={item._id}>
                        <AlbionOffers {...item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Albion