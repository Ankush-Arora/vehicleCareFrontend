import React from 'react'
import './CarouselStyles.css'
import CarouselCardComponent from './CarouselCardComponent';
import SettingsIcon from '@mui/icons-material/Settings';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const CarouselComponent = () => {

    const btnPrevCarousel = () => {
        let box = document.querySelector('.carousel-main');
        //  let width=box.clientWidth;
        // Subtracting 320px because each card width is 300px + 20px(margin) so it slide next card  
        box.scrollLeft = box.scrollLeft - 320;
    }

    const btnNextCarousel = () => {
        let box = document.querySelector('.carousel-main');
        //  let width=box.clientWidth;
        // Adding 320px because each card width is 300px + 20px(margin) so it slide next card
        box.scrollLeft = box.scrollLeft + 320;
    }

    const popularServices = [
        { id: 1, serviceName: 'Car Wash', image: 'images/car.jpg', description: 'Hire a washing agent for help around the house.Our trained Agent can wash your car at your home.', startPrice: 199 },
        { id: 2, serviceName: 'Foam Car Wash', image: 'images/whiteCarWash.jpg', description: 'Hire a carpenter for help around the house.Our Agent can repair and build all kind of furnitures at your home.  ', startPrice: 349 },
        { id: 3, serviceName: 'Water Wash Only', image: 'images/waterWash.jpg', description: 'Hire a Plumber for help around the house.Our Agent can do all kind of plumbing work. ', startPrice: 199 },
        { id: 4, serviceName: 'Snow Foam Wash', image: 'images/carFoamWash.jpg', description: 'Hire a Mechanic for help around the house.Our Mechanic can repair your car perfectly.', startPrice: 349 },
        { id: 5, serviceName: 'Bullet Wash', image: 'images/bulletWash.jpg', description: 'Hire a Painter for help around the house.Our Painter can paint your house as per your expectations.', startPrice: 149 },
        { id: 6, serviceName: 'Scooty Wash', image: 'images/scootywash.jpg', description: 'Hire a Mounting agent for help around the house.Our Agent can fixes your Tv on the wall.', startPrice: 99 },
        { id: 7, serviceName: 'Foam Wash', image: 'images/foamWash.jpg', description: 'Hire a Agent for help around the house.Our Agent can repair fixes your Air Conditioner on wall.', startPrice: 299 },
        { id: 8, serviceName: 'Bus Wash', image: 'images/busWash.jpg', description: 'Hire a professional driver for car driving around the house.You can hire our driver on per day basis.', startPrice: 299 },
        { id: 9, serviceName: 'Bike Foam Wash', image: 'images/bikeWashImg.jpg', description: 'Hire a Electrician for help around the house.Our Agent can fixes electricity of your house.', startPrice: 199 },
        { id: 10, serviceName: 'Soap Wash', image: 'images/scratchLessWash.jpg', description: 'Hire a Welder for help around the house.Our Agent can do all kind of welding.', startPrice: 199 },
    ]

    return (
        <><p id='popular-service'><sub >  <TimeToLeaveIcon id='popular-service-icon' /></sub> &nbsp;Popular Washing <sub > &nbsp; <TwoWheelerIcon id='popular-service-icon' /></sub></p>
            <div className='carousel-main'>
                <button className='prev-btn' onClick={btnPrevCarousel}>&lt;</button>
                <button className='next-btn' onClick={btnNextCarousel}>&gt;</button>
                {
                    popularServices.map((eachService, idx) => 
                    <CarouselCardComponent key={idx} eachServiceProp={eachService} />)
                }
            </div></>
    )
}

export default CarouselComponent
