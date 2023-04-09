import React from 'react'
import Sidebar from '../Sidebar/Sidebar.js'
import mmorpg from './mmo'
import MmoGames from './MmoGames.js'
import './Mmorpg.css'
import { ShoppingUseContext } from '../Contexts/Contexts.js'
// import games from '../../data/mmo'
const Mmorpg = () => {
    const {search} = ShoppingUseContext()
    return (
        <div className='main'>
            {<Sidebar search={search}/>}
            <div className='container'>
            {mmorpg.filter((val) => {
            if(search === " ") {
                return val
            } else if(val.name.toLowerCase().includes(search.toLowerCase())){
                return val
            } else {
                return false;
            }
            }).map((item) => (
                <div key={item.id}>
                <MmoGames {...item}/>
                </div>
            )
            )}
            </div>
        </div>
    )
}

export default Mmorpg