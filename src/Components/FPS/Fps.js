import React from 'react'
import fps from '../../data/FPS'
import Sidebar from '../Sidebar/Sidebar'
import FPSGames from './FPSGames'
import { ShoppingUseContext } from '../Contexts/Contexts'
const Fps = () => {
    const {search} = ShoppingUseContext()
    return (
        <div className='main'>
            <Sidebar search={search}/>
            <div className='container'>
                {fps.filter((val)=>{
                    if(search === " ") {
                        return val
                    } 
                    else if(val.name.toLowerCase().includes(search.toLowerCase())) {
                        return val
                    }
                    else {
                        return false;
                    }
                }).map((item)=>(
                    <div key={item.id}>
                        <FPSGames {...item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Fps