import Sidebar from "../Sidebar/Sidebar"
import Info from "../Info/Info"
import {useState} from 'react'
import './Games.css'
import games from '../../data/Games'
import { useCookies } from 'react-cookie';
import { ShoppingUseContext } from "../Contexts/Contexts"
const Games = () => {
    const [cookies] = useCookies(['token']);
    const { search } = ShoppingUseContext()
    const [loading , setLoading] = useState(false)
    if(!cookies.token) {
        setLoading(true);
        window.location.href = '/';
    }
    if (loading) {
        return <div className="loading">
        <span className="spinner-border" role="status" aria-hidden="true"></span>
        Loading...
        </div>;
      }
    return (
        <div className='main'>
            {<Sidebar  search={search}/>}
            <div className="container">
                {games.filter((val) => {
                    if (search === " ") {
                        return val
                    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    } else {
                        return false;
                    }
                }).map((item , i) => (
                    <div key={i}>
                        <Info {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Games




