import React, { Fragment, useEffect, useState } from 'react'
import '../services/ServicesStyles.css'
import ServiceCardComponent from '../serviceCard/ServiceCardComponent'
import BookingStepsComponent from '../bookingSteps/BookingStepsComponent'
import MetaData from '../navbar/MetaData'
import { getService } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../loading/Loading'
import {useAlert} from "react-alert"


const ServicesComponent = () => {

  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,services}=useSelector((state)=>state.services)
  const [service,setService]=useState();

  useEffect(()=>{
       dispatch(getService());
      //  if(services===null) alert('server is not working');
  },[dispatch])

  // const services = [
  //   { id: 1, serviceName: 'Barber', image: 'images/barber.jpg', description: 'Hire a barber for help around the house.Our trained Agent can do shaving and cutting.', startPrice: 149 },
  //   { id: 2, serviceName: 'Carpenter', image: 'images/carpenter.jpg', description: 'Hire a carpenter for help around the house.Our Agent can repair and build all kind of furnitures at your home.  ', startPrice: 499 },
  //   { id: 3, serviceName: 'Plumbing', image: 'images/plumber.jpg', description: 'Hire a Plumber for help around the house.Our Agent can do all kind of plumbing work. ', startPrice: 399 },
  //   { id: 4, serviceName: 'Construction', image: 'images/construction.jpg', description: 'Hire a Constructor for help around the house.Our Constructor can repair and build your house.', startPrice: 799 },
  //   { id: 5, serviceName: 'Car Mechanic', image: 'images/car-mechanic.jpg', description: 'Hire a Mechanic for help around the house.Our Mechanic can repair your car perfectly.', startPrice: 299 },
  //   { id: 6, serviceName: 'Bike Mechanic', image: 'images/bike-mechanic.jpg', description: 'Hire a Mechanic for help around the house.Our Mechanic can repair your two wheeler perfectly.', startPrice: 199 },
  //   { id: 7, serviceName: 'Painter', image: 'images/painter.jpg', description: 'Hire a Painter for help around the house.Our Painter can paint your house as per your expectations.', startPrice: 349 },
  //   { id: 8, serviceName: 'Tv Mounting', image: 'images/tv-mounting.jpg', description: 'Hire a Mounting agent for help around the house.Our Agent can fixes your Tv on the wall.', startPrice: 549 },
  //   { id: 9, serviceName: 'Air Conditioner', image: 'images/air-conditioner.jpg', description: 'Hire a Agent for help around the house.Our Agent can repair fixes your Air Conditioner on wall.', startPrice: 499 },
  //   { id: 10, serviceName: 'Drivers', image: 'images/carDriver.jpg', description: 'Hire a professional driver for car driving around the house.You can hire our driver on per day basis.', startPrice: 599 },
  //   { id: 11, serviceName: 'Electrician', image: 'images/electrician.jpg', description: 'Hire a Electrician for help around the house.Our Agent can fixes electricity of your house.', startPrice: 399 },
  //   { id: 12, serviceName: 'Fabrication', image: 'images/welding.jpg', description: 'Hire a Welder for help around the house.Our Agent can do all kind of welding.', startPrice: 299 },
  //   { id: 13, serviceName: 'Tiles/Granite', image: 'images/tiles.jpg', description: 'Hire a Worker for help around the house.Our Agent can fixes the tiles of your home.', startPrice: 449 },
  //   { id: 14, serviceName: 'Laundary', image: 'images/laundary.jpg', description: 'Hire a Laundary man for help around the house.Our Agent can pick and deliver your clothes after washing.', startPrice: 149 },

  // ]
  const [input, setInput] = useState('all');
  const [searchInput, setSearchInput] = useState('all');

  const updateInput = (val) => {
    setInput(val.target.value.toLowerCase().trim());
  }

  return (
    <Fragment>
      {
        loading ? (<Loading/>):
    <div className='service-component' >
      <MetaData title="Services Page"/>
      <div className='component-heading'><h1><p className='animation-heading'>Available Washing</p></h1></div>
      <div className='first-container'>
        <img src='images/part1.jpg' id='first-container-img' alt='img not found' />
        <img src='images/part5.jpg' id='first-container-img' alt='img not found' />
        <img src='images/part4.jpg' id='first-container-img' alt='img not found' />
        <img src='images/part6.jpg' id='first-container-img' alt='img not found' />
        
        {/* <h3 className='image-text'>Book trusted help for your home tasks </h3>  */}
      </div>
      <BookingStepsComponent  />
      <div className='search-input-container'>
        <input type='text' className='search-input' placeholder='search service' onChange={updateInput} />
        <button className='site-btn' onClick={() => setSearchInput(input)}>Search</button>
      </div>
      {/* <div className='second-container'>
        {
          services.map((eachService, idx) => eachService.serviceName.toLowerCase().includes(searchInput.toLowerCase()) || eachService.description.toLowerCase().includes(searchInput.toLowerCase()) || searchInput.toLowerCase().trim() === 'all' ? <ServiceCardComponent key={idx} serviceProps={eachService} /> : <></>)
        } 
      </div>*/}
      <div className='second-container'>
        {
         services && services.map((eachService, idx) => eachService.name.toLowerCase().includes(searchInput.toLowerCase()) ||
           eachService.searchingNames.toLowerCase().includes(searchInput.toLowerCase()) || 
           searchInput.toLowerCase().trim() === 'all' ? 
           <ServiceCardComponent key={idx} serviceProps={eachService} /> : <></>)
        }
      </div>
      <div></div>
    </div>
}</Fragment>
  )
}

export default ServicesComponent
