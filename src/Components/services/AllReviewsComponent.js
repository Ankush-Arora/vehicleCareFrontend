import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../navbar/MetaData'
import './AllReviewsStyles.css'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReviewMethod, getServiceDetailsById, getServiceReviews } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import DeleteIcon from '@mui/icons-material/Delete'
import Loading from '../loading/Loading'
import ReactStars from "react-rating-stars-component"
import { green, red, yellow } from '@mui/material/colors'
import PersonIcon from '@mui/icons-material/Person';
import { CLEAR_ERRORS, REVIEW_DELETE_RESET } from '../../constants/serviceConstants'

const AllReviewsComponent = () => {


  const alert = useAlert();
  const paramsUrl = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [deletedReviewName,setDeletedReviewName]=useState("");
   const [deleteReviewId,setDeleteReviewId]=useState("");
  // const [reviews,setReviews]=useState([]);
  const { loading, allReviews, overAllrating,isDeleted,error } = useSelector((state) => state.allReviews);

  useEffect(() => {
    const controller=new AbortController();
    try {
      dispatch(getServiceReviews(paramsUrl.id));
      // alert.success('overAllRating=' + overAllrating);
      if(isDeleted)
      {
        alert.success("Review has been deleted");
        dispatch({type:REVIEW_DELETE_RESET});
      }
      if(error)
      {
        alert.error("some error occured");
        dispatch({type:CLEAR_ERRORS});
      }
    }
    catch {
      navigate('/');
    }
    return ()=>{
      controller.abort();
    }
  }, [dispatch,isDeleted,error]);

  const openDeleteReviewModalMethod = (data) => {
    const modalElement = document.getElementById('delete-modal-service');
    setDeletedReviewName(data.name);
    setDeleteReviewId(data._id);
    modalElement.showModal();
}

const closeDeleteReviewModalMethod = () => {
    const element = document.getElementById('delete-modal-service');
    element.close();
}

const deleteReviewHandler=()=>{
  dispatch(deleteReviewMethod(deleteReviewId,paramsUrl.id));
  closeDeleteReviewModalMethod();
}
  return (
    (loading) ? <Fragment><Loading /> </Fragment> :
      <div className='all-reviews-main'>
        <MetaData title="All Reviews" />
        <div className='component-heading'><h1><p className='animation-heading'>All Reviews</p></h1></div>
        {/* <h1> ALL REVIEW COMPONENTS </h1> */}

        <dialog id='delete-modal-service' className='delete-modal-class'>
                    <h3>DELETE REVIEW</h3>
                    <hr id='line-horizontal-global'/>
                    <h4> Are you sure to delete {deletedReviewName} review?   </h4>
                    <div id='modal-buttons'>
                        <button onClick={()=>deleteReviewHandler()} >Yes</button>
                        <button onClick={closeDeleteReviewModalMethod} >No</button>
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                </dialog>

        <div className='all-reviews-card-container'>
          {
            allReviews && allReviews.map((eachReview, idx) => (

              <div className='each-user-review-card' key={idx}>
                <div className='review-heading-card'><span> <sub id='text-content-review'><PersonIcon /></sub>{eachReview.name} </span>  <span>
                  <ReactStars id="stars-id" isHalf={true} value={eachReview.rating} edit={false} color={'rgba(20,20,20,0.1)'} size={22} /></span> <span>
                     <sub> <DeleteIcon id='delete-btn-review' onClick={()=>openDeleteReviewModalMethod(eachReview)} /></sub></span></div>
                <hr id='hor-line-reviews' />
                <div><b>UserId: </b> <span id='text-content-review'>{eachReview.user} </span> </div>
                <div><b>ReviewId:</b> <span id='text-content-review'> {eachReview._id} </span> </div>
                <div>comment: &nbsp;<span id='text-content-review'>{eachReview.comment}</span>  </div>

              </div>
            ))
          }
        </div>
      </div>
  )
}

export default AllReviewsComponent
