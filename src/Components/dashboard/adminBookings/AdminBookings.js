import React, { useEffect, useState } from 'react'
import './AdminBookingsStyles.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../../../actions/bookingsAction';

const AdminBookings = () => {

  const { allBookings, error:bookingErrors } = useSelector((state) => state.allBookings);
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(getAllBookings());
    },[dispatch]);

    
  return (
    <div>
      <div className='component-heading'><h1><p className='animation-heading'>Admin Bookings</p> </h1>
      </div>
      {/* <h1>Admin Bookings components</h1> */}
      <div className='top-row-canceled'> 
            <Link to='/admin/dashboard/bookings/canceled'>  <button id='order-view-btn'>VIEW CANCELED ORDERS</button></Link>
          </div>
      <div className='bookings-order-main'>
        <div className='first-row'>
          <div className='first-row-allOrders'><h3>ALL ORDERS</h3>
            <div id='orders-count-div'>{allBookings ? allBookings.length:0}</div>
            <Link to='/admin/dashboard/bookings/allOrders'><button id='order-view-btn'>view</button></Link>
          </div>
          <div className='first-row-newOrders'><h3>NEW ORDERS</h3>
            <div id='orders-count-div'></div>
          <Link to='/admin/dashboard/bookings/newOrders'> <button id='order-view-btn'>view</button></Link>
          </div>
        </div>
        <div className='second-row' >
          <div className='second-row-processing'><h3>PROCESSING ORDERS</h3>
            <div id='orders-count-div'></div>
            <Link to='/admin/dashboard/bookings/processing'>  <button id='order-view-btn'>view</button></Link>
          </div>
          <div className='second-row-completed'><h3>COMPLETED ORDERS</h3>
            <div id='orders-count-div'></div>
            <Link to='/admin/dashboard/bookings/completed'>  <button id='order-view-btn'>view</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBookings
