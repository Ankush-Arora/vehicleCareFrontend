import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../navbar/MetaData'
import './EachServiceStyles.css'
import ReviewsComponent from './ReviewsComponent'
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createReview, getServiceDetailsById } from '../../actions/productActions'
import Loading from '../loading/Loading'
import { useAlert } from 'react-alert'

const EachServiceComponent = () => {

  const dispatch = useDispatch();
  const paramUrl = useParams();

  const { loading, success, service, error } = useSelector((state) => state.newService);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { error: reviewError, success: reviewSuccess } = useSelector((state) => state.newReview);
  const alertMessage = useAlert();
  const navigate = useNavigate();
  const alertMsg=useAlert();
  const [customerRatings, setCustomerRatings] = useState(0);
  const [customerComment, setCustomerComment] = useState("");



  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    size: window.innerWidth < 740 ? 20 : 25,
    value: (service) ? service.ratings : 0,
    isHalf: true
  }

  const options2 = {
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    size: window.innerWidth < 740 ? 25 : 30,
    isHalf: true
  }

  const ratingChanged = (newRating) => {
    // console.log(newRating);
    setCustomerRatings(newRating);
  };

  const openAddReviewModalMethod = () => {
    const modalElement = document.getElementById('add-review-modal');
    modalElement.showModal();
  }

  const closeAddReviewModalMethod = () => {
    const element = document.getElementById('add-review-modal');
    element.close();
  }


  const reviewSubmitHandler = () => {
    const reviewData = {
      "rating": Number(customerRatings),
      "comment": customerComment,
      "serviceId": paramUrl.id
    }
    //  alert(reviewData.serviceId);
    dispatch(createReview(reviewData));
    alertMsg.success('Review has been submitted');
    closeAddReviewModalMethod();
    setTimeout(()=>{
      window.location.reload();
    },1500)
    
  }

  useEffect(() => {
    const controller=new AbortController();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(getServiceDetailsById(paramUrl.id));
    return ()=>{
      controller.abort();
    }
  }, [dispatch, error])


  return (
    (loading) ? <Fragment><Loading /></Fragment> :
      <div className='each-service-top'>
        <MetaData title="Washing Details" />
        <div className='component-heading'><h1><p className='animation-heading'>Washing Details</p></h1></div>

        <dialog id='add-review-modal' className='delete-booking-modal-class'>
          <h3>Add Ratings</h3>
          <hr id='line-horizontal-global' />
          <div id='modal-add-review'>
            <div> <ReactStars id="stars-id"  {...options2} value={customerRatings} onChange={ratingChanged} /></div>
            <textarea type='text' onChange={(e) => setCustomerComment(e.target.value)} placeholder='Comment here' />
          </div>
          <div id='modal-buttons'>
            <button onClick={reviewSubmitHandler} >Submit</button>
            <button onClick={closeAddReviewModalMethod} >Close</button>
            {/* <h4>you have selected {selectedOption}</h4> */}
          </div>
        </dialog>

        {(service && service.images !== undefined && service.reviews !== undefined) ? <div className='each-service-details'>
          <img id='service-image' src={service.images[0].url} alt="image not found" height="400px" width="30%" />

          <div className='each-service-details-data'>
            <ul>
              <li id='service-name'> {(service.name)}  </li>
              <li id='service-description'> {service.description}   </li>
              <li>Service: &nbsp; <b id={service.serviceAvailable ? 'greenFont' : 'redFont'}>
                {service.serviceAvailable ? 'Available' : 'Currently Unavailable'}</b> </li>
              <li id='price-service'> Pricing starts at <span><b> ₹{service.price}</b></span></li>
              <li id='service-btns'>

                {isAuthenticated === true ?
                  (service.serviceAvailable === false) ? <b id='service-unavailable-heading'></b> :
                    <button id='book-service-link'><Link to='/bookingService' state={{ serviceProp: service }}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Book Service</Link></button> :
                  <button id='book-service-link'> <Link to='/login'  
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Book Service </Link></button>}

               {isAuthenticated === true? <button onClick={openAddReviewModalMethod}>Add Review </button>:
                <button id='book-service-link'> <Link to='/login'  
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Add Review </Link></button>
               }

               {(isAuthenticated === true && user.role==='admin') ? 
                <button id='book-service-link'> <Link to={`/service/reviews/${paramUrl.id}`}  
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>View Review </Link></button>:<></>
               }

              </li>
            </ul>
            <hr />
            <div> <ReactStars id="stars-id" {...options} /></div>
            <div id='overall-rating-heading'>(reviews {(service.numOfReviews)}) &nbsp; (ratings {(service) ? service.ratings.toFixed(1) : 0})</div>
            <hr />
          </div>
        </div> : ''}

        <h1 id='review-heading'>REVIEWS</h1>
        <div className='each-service-reviews'>
          {(service.reviews !== undefined && service.reviews.length > 0) ?
            service.reviews.map((eachReview, idx) => <ReviewsComponent key={idx} reviewProp={eachReview} />)
            : <h1 id='no-reviews-heading' ><div>No reviews yet</div></h1>}
        </div>
      </div>
  )
}

export default EachServiceComponent
