import React from 'react'
import './BookingStepsStyles.css'
const BookingStepsComponent = () => {

    return (
        <div className='booking-main'>
            <div className='process-heading process-animation-right'  >
                <button>The Process...</button>
                <h3>How It Works</h3>
            </div>
            <div  >
                <h3 ><span>01</span> <span>/ Explore</span></h3>
                <h6>Choose the required wash and inquiring with us.Will provide wash agent for you home</h6>
            </div>
            <div   >
                <h3>02 <span>/ Signup</span></h3>
                <h6>Use our services with a simple Signup</h6>
            </div>
            <div >
                <h3>03 <span>/ Book The Service</span></h3>
                <h6>Get the service according to your preference</h6>
            </div>
            <div  >
                <h3>04 <span>/ Relax</span></h3>
                <h6> Our Expert will take charge of your vehicle for the selected service!</h6>
            </div>
        </div>
    )
}

export default BookingStepsComponent
