import React from 'react'
import '../Styles/AboutUsSection.css'
import aboutus from '../images/aboutus.jpg'
const AboutUsSection = () => {
  return (
    <div className='about-us'>
        <div className='image-aboutus'>
            <img src={aboutus} alt="About Us Image" />
        </div>
        <div className='Description'>
            <h1>About Us Example</h1>
            <h3>About Us Sub-title Description</h3>
            <p className='Description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ante dolor, scelerisque id feugiat eu, consequat quis dui. Etiam at mattis ante.
            </p>
            <a href="/" className='btn-aboutus'>Read More</a>                                                                                                             
        </div>
    </div>
  )
}

export default AboutUsSection