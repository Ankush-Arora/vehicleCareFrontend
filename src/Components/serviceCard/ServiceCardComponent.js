import React, { Fragment, useEffect, useState } from 'react'
import './ServiceCardStyles.css'
import { Link } from 'react-router-dom';
import BookingServiceComponent from '../bookingService/BookingServiceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserMethod } from '../../actions/userActions';
import ReactStars from "react-rating-stars-component"
import { red } from '@mui/material/colors';
import { getServiceDetailsById } from '../../actions/productActions';
import Loading from '../loading/Loading'
const ServiceCardComponent = (props) => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, success, service: currentService, error } = useSelector((state) => state.newService);
  const [ratingValue, setRatingValue] = useState();
  const dispatch = useDispatch();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    size: window.innerWidth < 740 ? 20 : 25,
  }
  const ratingChanged = (newRating) => {
    // console.log(newRating);
  };

  useEffect(() => {
    dispatch(loadUserMethod());
    dispatch(getServiceDetailsById(props.serviceProps._id));
    setRatingValue(currentService.ratings);
  }, [dispatch])


  const [service, setService] = useState(props.serviceProps);
  return (
    (loading) ? <Fragment> <Loading /> </Fragment> :
      <Link className='service-card-container-parent' to={`/service/${props.serviceProps._id}`}>
        <div className='service-card-container'>
          <div className='image-area'> <img src={service.images[0].url} alt='img not found' /></div>
          <div className='text-area'>

            <h4><b>{service.name}</b>
            {isAuthenticated === true ?
              (service.serviceAvailable === false) ? <b id='service-unavailable-heading'>unavailable</b> :
                <Link to='/bookingService' state={{ serviceProp: service }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Book</Link> :
              <Link to='/login' state={{ serviceProp: service }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Book</Link>}</h4>
                
            <hr className='horizontal-line-main' />

            <div className='star-ratings-service'>   <ReactStars id="stars-id" count={5} isHalf={true} {...options} value={(props.serviceProps.ratings)} /> <span>({props.serviceProps.numOfReviews} reviews)</span></div>
            <h6><span> Pricing starts at </span><span id='service-price'>₹{service.price}</span></h6>
            <p id='service-description'>{service.tagline}</p>

          </div>
        </div>
      </Link>
  )
}

export default ServiceCardComponent
