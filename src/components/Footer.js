import React from 'react'
import '../Styles/Footer.css'
import logo from '../images/logo.jpg'

const Footer = () => {
  return (
    <div className='footer'>
        <section className='contact-us'>
            <h1>Contact Us</h1>
            <p>Send us a message</p>
            <form className='formulaire'>
                <input type='text' placeholder='Full Name'/>
                <input type='text' placeholder='Your email'/>
                <textarea type='text' placeholder='Your Message'></textarea>

                <input type='submit' value="Envoyer" className='btn-submit'/>
            </form>
        </section>
        <section className='site-map'>
            <h1>Site Map</h1>
            <p>All our pages Below</p>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>About Us</a></li>
                <li><a href='/'>Contact Us</a></li>
                <li><a href='/'>Feature</a></li>
            </ul>
        </section>
        <section className='info'>
            <img src={logo}/>
            <p><span style={{'fontWeight':'bold', 'color':'white'}}>phone number :</span> +216 99 275 200</p>
            <p><span style={{'fontWeight':'bold', 'color':'white'}}>email address : </span>rachdioussama33@gmail.com</p>
        </section>
    </div>
  )
}

export default Footer