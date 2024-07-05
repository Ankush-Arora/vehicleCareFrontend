import React, { Fragment, useEffect, useState } from 'react'
import './OrderCardStyles.css'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { BOOKING_CANCEL_RESET } from '../../constants/bookingsConstants';
import { cancelBookingByUser } from '../../actions/bookingsAction';
import { useNavigate } from 'react-router';
import ReactStars from "react-rating-stars-component"
import { createReview } from '../../actions/productActions';
import { NEW_REVIEW_RESET } from '../../constants/serviceConstants';

const OrdersCardComponent = (props) => {

  const { error: bookingError, isBookingUpdated } = useSelector((state) => state.updateBooking);
  const dispatch = useDispatch();
  const alertMessage = useAlert();
  const navigate = useNavigate();
  
  useEffect(() => {
  }, [dispatch])
  
  return (
    <div className='order-card-component'>

      <h3>
        {props.eachBooking.bookingStatus === 'booked' ?
          <p id='status-icon-booked'><sub><DownloadDoneIcon id='order-status-icon' /></sub> Booked <button id='cancel-order-btn' onClick={()=>{
            const data = {
              "changeBookingStatus": "cancelled by customer"
            }
             dispatch(cancelBookingByUser(props.eachBooking._id, data));
             alertMessage.success('Booking Cancelled Successfully!!');
             navigate('/');
             }}>Cancel Order</button></p> : <></>}
        {props.eachBooking.bookingStatus === 'processing' ?
          <p id='status-icon-processing'><sub><HowToRegIcon id='order-status-icon' /></sub> Processing</p> : <></>}
        {props.eachBooking.bookingStatus === 'completed' ?
          <p id='status-icon-completed'><sub><LibraryAddCheckIcon id='order-status-icon' /></sub> Completed </p> : <></>}
        {props.eachBooking.bookingStatus === 'cancel' || props.eachBooking.bookingStatus === "cancelled by customer" ?
          props.eachBooking.bookingStatus === 'cancel' ? <p id='status-icon-canceled'><sub><DisabledByDefaultIcon id='order-status-icon' /></sub> Cancelled</p> :
            <p id='status-icon-canceled'><sub><DisabledByDefaultIcon id='order-status-icon' /></sub> Cancelled By USER</p> : <></>}
      </h3>
      <hr />
      <ul>
        <li><b>{props.eachBooking.serviceName}</b> &nbsp; <span id='vehicle-details'>{props.eachBooking.vehicleNumber.toUpperCase()}</span>  </li>
        <li><sub><MailIcon id='mail-icon-bookings' />&nbsp;</sub>: {props.eachBooking.email}</li>
        <li><sub><PhoneIcon id='call-icon-bookings' />&nbsp;</sub>:{props.eachBooking.phoneNumber} &nbsp; <span id='vehicle-details'>{props.eachBooking.vehicleName.toUpperCase()}</span></li>
        <li><b>ID:</b> &nbsp; {props.eachBooking._id}   </li>
        {/* <li>ServiceId {props.eachBooking.serviceId}</li> */}
        <li> <sub id='booked-date'> Booked At: &nbsp;  {moment(props.eachBooking.bookedAt).format('MMMM Do YYYY, h:mm:ss a')}</sub></li>
      </ul>
      <hr />
      <ul>
        <li> <b> ADDRESS:</b></li>
        <li>{props.eachBooking.address.houseNumber} </li>
        <li>{props.eachBooking.address.area}</li>
        <li>{props.eachBooking.address.pincode} </li>
        <li>{props.eachBooking.address.city},{props.eachBooking.address.state},{props.eachBooking.address.country}</li>
      </ul>
      <hr />
      <ul>
        <li> <b> JOD DETAILS :</b> {props.eachBooking.workDetails}
        </li>
      </ul>
    </div>
  )
}

export default OrdersCardComponent
