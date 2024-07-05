import React, { useState } from 'react'
import './CarouselCardStyles.css'
import { Link } from 'react-router-dom';
import BookingServiceComponent from '../bookingService/BookingServiceComponent';
const CarouselCardComponent = (props) => {
    const [popularService, setPopularService] = useState(props.eachServiceProp);
    return (
        <Link to='services' id='carousel-link-main'>
        <div className='carousel-container'>
            <div className='carousel-image-section'>
                {/* <Link to='/bookingService' 
            state={{ serviceProp: popularService }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> */}
                <img src={popularService.image} alt='image-not found' />
                {/* </Link>  */}
                </div>
            <div className='carousel-title-section'>  <span>{popularService.serviceName.toUpperCase()}</span>
             <span id='carousel-pricing'>Project starts at <span id='carousel-pricing-inner'>₹{popularService.startPrice}</span></span></div>
        </div></Link>
    )
}

export default CarouselCardComponent
