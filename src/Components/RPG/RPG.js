import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import rpg from '../../data/RPG'
import RPGames from './RPGames'
import { ShoppingUseContext } from '../Contexts/Contexts.js'
const RPG = () => {
    const {search} = ShoppingUseContext()
    return (
        <div className='main'>
        <Sidebar search={search}/>
        <div className='container'>
        {rpg.filter((val)=>{
            if(search === " ") {
                return val
            } 
            else if(val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            } else {
                return false;
            }
        }).map((item) => (
            <div key={item.id}>
                <RPGames {...item}/>
            </div>
        ))}
        </div>
        </div>
    )
}

export default RPG