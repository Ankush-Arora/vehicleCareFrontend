import React from 'react'
import './HomeStyles.css'
import '../styles/Styles.css'
import ServiceCardComponent from '../serviceCard/ServiceCardComponent'
import BookingStepsComponent from '../bookingSteps/BookingStepsComponent'
import CarouselComponent from '../carousel/CarouselComponent'
import AgentVerificationComponent from '../agentVerification/AgentVerificationComponent'
import QueryComponent from '../queryForm/QueryComponent'
import MetaData from '../navbar/MetaData'
// import TeamCardComponent from '../teamcard/TeamCardComponent'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SubscriptionComponent from '../subscriptions/SubscriptionComponent'

const HomeComponent = () => {

  return (
    <div className='home-container content-below-navbar'>
      <MetaData title="Home Page"/>
      <div className='first-home-heading component-heading'>
        <p className='animation-heading'>Book washing service</p>
        <p className='animation-heading'>for your vehicle</p>
      </div>
      <div className='first-image'>
        <img src='images/frontImage.jpg' alt='image-not found' />
      </div>

      <CarouselComponent />
      <AirportShuttleIcon id='moving-car'/>
      <div className='varification-heading'>Customer satisfaction is our focus</div>
      <AgentVerificationComponent />
      <SubscriptionComponent/>
      <QueryComponent />
    </div>
  )
}

export default HomeComponent
