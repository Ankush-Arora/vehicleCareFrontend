import React, { Fragment, useEffect } from 'react'
import './BookedServicesStyles.css'
import OrdersCardComponent from './OrdersCardComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingLoggedInUser } from '../../actions/bookingsAction'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Loading from '../loading/Loading'

const BookedServicesComponent = () => {

  const dispatch=useDispatch();
  const { allBookings, error: bookingErrors } = useSelector((state) => state.allBookings);
  const {loading,user}=useSelector((state)=>state.user);

  useEffect(()=>{
    const controller=new AbortController();
        dispatch(getAllBookingLoggedInUser());
        return ()=>{
          controller.abort();
        }
  },[dispatch])

  return (
    <div className='booked-service'>
      <div className='component-heading'><h1>Booked Services</h1></div>
    {  (allBookings && allBookings.length===0) ?  <div className='empty-bookings'>
    <h1>You haven't booked service <RemoveShoppingCartIcon id='empty-booking-icon'/></h1>
    </div> :
      <div className='booked-main-container'>
     {    
      allBookings && allBookings.map((eachBooking,idx)=> <> <OrdersCardComponent key={idx} eachIndex={idx} eachBooking={eachBooking} allData={allBookings?allBookings:[]}/> <div id='order-division'> </div>  </>)
     }
      </div> }
    </div>
  )
}

export default BookedServicesComponent
