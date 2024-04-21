import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'
import Logo from '../images/logo.jpg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo'><img src={Logo} /></div>
        <ul>
            <div className='menu'>
                <li className='active'><Link to="/">Home</Link></li>
                <li><Link to='/about-us'>About Us</Link></li>
                <li><Link to='/donate'>Donate</Link></li>
            </div>
            
        </ul>
    </div>
  )
}

export default Navbar