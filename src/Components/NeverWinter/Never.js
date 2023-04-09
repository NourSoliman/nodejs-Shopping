import React from 'react'
import NeverInfo from './NeverInfo'
import Sidebar from '../Sidebar/Sidebar'
import NeverWinter from './NeverWinter'
const Never = () => {
    return (
        <div className='main'>
            <Sidebar />
            <div className='container'>
            {NeverInfo.map((item)=> (
                <NeverWinter {...item}/>
                ))}
            </div>
        </div>
    )
}

export default Never