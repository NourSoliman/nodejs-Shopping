import React from 'react'
import images from './images'
import './slider.css'
import { useState, useRef, useEffect } from 'react'
const Slider = () => {
    const resetTimeOut = () => {
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
    }
    const timeOutRef = useRef(null)
    const [index, setIndex] = useState(0)
    const delay = 1900;
    useEffect(() => {
        resetTimeOut();
        timeOutRef.current = setTimeout(() =>
            setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        )
        return () => {
            resetTimeOut();
        };
    }, [index])
    console.log(index);
    return (
        <div>
            <div className='slide-container' >
                <div className='slide-header' >
                    <h1>Our Top Sales</h1>
                </div>
                <div className='slides' drag="x" style={{ transform: `translate3d(${-index * 40}% , 0 , 0)` }} >
                    {images.map((image) => (
                        <div key={image} className="image-container">
                            <img src={image} alt="slider-images" className="slider-images" ></img>
                        </div>
                    )
                    )}
                </div>
            </div>
            <div className='dots'>
                {images.map((_, i) => (
                    <div key={i} className={`dot${index === i ? " active" : ""}`} onClick={() => setIndex(i)}></div>
                ))}
            </div>
        </div>
    )
}

export default Slider