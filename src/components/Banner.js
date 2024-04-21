import React from 'react'
import '../Styles/Banner.css'
const Banner = () => {
  return (
    <header className='banner'>
        
        <div className='hero-section'>
            <h1 className='hero-title'>Hello Dear.</h1>
            <h3 className='sub-hero-title'>Want To Donate Here?</h3>
            <a href='/' className='Donate-btn'>Donate</a>
        </div>
    </header>
  )
}

export default Banner