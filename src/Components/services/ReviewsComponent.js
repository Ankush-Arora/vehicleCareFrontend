import React from 'react'
import './ReviewsStyles.css'
import ReactStars from "react-rating-stars-component"

const ReviewsComponent = (props) => {

    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"red",
        size:window.innerWidth <740 ?20:25,
        value:props.reviewProp.rating,
        isHalf:true
      }

      // console.log(props);
  return (
    <div id='review-main-top'>
    <div className='review-main'>
      <div>{props.reviewProp.name} </div>
      <div> <ReactStars id="stars-id" {...options} /></div>
      <div id='user-comments'><b>comment: </b> &nbsp; 
      <span>{props.reviewProp.comment} </span>
      </div>
    </div></div>
  )
}

export default ReviewsComponent
