import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '../src/Components/styles/Styles.css'
import NavbarComponent from './Components/navbar/NavbarComponent';
import HomeComponent from './Components/home/HomeComponent';
import ServicesComponent from './Components/services/ServicesComponent';
import LoginComponent from './Components/login/LoginComponent';
import FooterComponent from './Components/footer/FooterComponent';
import AboutUsComponent from './Components/aboutus/AboutUsComponent';
import SignUpComponent from './Components/signup/SignUpComponent';
import BookingServiceComponent from './Components/bookingService/BookingServiceComponent';
import AccountComponent from './Components/account/AccountComponent';
// import Loading from './Components/errorPage/Loading';
import DashboardComponent from './Components/dashboard/DashboardComponent';
import AdminServices from './Components/dashboard/adminServices/AdminServices';
import AdminBookings from './Components/dashboard/adminBookings/AdminBookings';
import AdminUsers from './Components/dashboard/adminUsers/AdminUsers';
import AdminWorkers from './Components/dashboard/adminWorkers/AdminWorkers';
import { Fragment, useEffect, useState } from 'react';
import store from './Store';
import { clearErrors, loadUserMethod } from './actions/userActions';
import {  useSelector } from 'react-redux';
import { Login } from '@mui/icons-material';
import Loading from './Components/loading/Loading';
import ErrorComponent from './Components/errorPage/ErrorComponent';
import AllOrderComponent from './Components/dashboard/adminBookings/allOrders/AllOrderComponent';
import NewOrdersComponent from './Components/dashboard/adminBookings/newOrders/NewOrdersComponent';
import ProcessingOrdersComponent from './Components/dashboard/adminBookings/processingOrders/ProcessingOrdersComponent';
import CompletedOrdersComponent from './Components/dashboard/adminBookings/completedOrder/CompletedOrdersComponent';
import { useAlert } from 'react-alert';
import BookedServicesComponent from './Components/bookedServices/BookedServicesComponent';
import CancelOrders from './Components/dashboard/adminBookings/cancelOrder/CancelOrders';
import QueriesDetailsComponent from './Components/dashboard/queries/QueriesDetailsComponent';
import ChangePasswordComponent from './Components/changePassword/ChangePasswordComponent';
import EachServiceComponent from './Components/services/EachServiceComponent';
import { CLEAR_ERRORS } from './constants/userConstants';
import EachWorkerComponent from './Components/dashboard/adminWorkers/EachWorkerComponent';
import AllReviewsComponent from './Components/services/AllReviewsComponent';
import ForgetPasswordComponent from './Components/forgetPassword/ForgetPasswordComponent';
import ResetPasswordComponent from './Components/resetPassword/ResetPasswordComponent';


function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  // const dispatch=useDispatch();
  const alert1=useAlert();
   

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent/> 
      <div className='content'>
      <Routes>
        <Route exact path='/' element={<HomeComponent />} />     
        <Route exact path='/services' element={<ServicesComponent/>} /> 
        <Route exact path='/service/:id' element={<EachServiceComponent/>} /> 
        <Route exact path='/bookingService'  element={<BookingServiceComponent/>} /> 
        <Route exact path='/login'  element={<LoginComponent/>} /> 
        <Route exact path='/aboutus'  element={<AboutUsComponent/>} /> 
        <Route exact path='/signup' element={<SignUpComponent/>} />
        <Route exact path='/account' element={<AccountComponent/>} />
        <Route exact path='/booked/services' element={<BookedServicesComponent/>} />
        <Route exact path='/password/reset/:token' element={<ResetPasswordComponent />} /> 
        <Route exact path='/forget/password' element=
        {(!user)?<ForgetPasswordComponent/>:  <Loading/>} />

        <Route exact path='/customer/queries/' element=
        {(user  && user.role==='admin')?<QueriesDetailsComponent/>:  <Loading/>} />
        <Route exact path='/admin/dashboard' element=
        {(user  && user.role==='admin')?<DashboardComponent/>:  <Loading/>} />
        <Route exact path='/admin/dashboard/services' element=
        {(user  && user.role==='admin')?<AdminServices/>: <Loading/>} />
        <Route exact path='/admin/dashboard/bookings' element=
        {(user  && user.role==='admin')?<AdminBookings/>: <Loading/>} />
        <Route exact path='/admin/dashboard/users' element=
        {(user  && user.role==='admin')?<AdminUsers/>: <Loading/>} />
        <Route exact path='/admin/dashboard/workers' element=
        {(user  && user.role==='admin')?<AdminWorkers/>: <Loading/>} />
         <Route exact path='/change/password' element=
        {(user )?<ChangePasswordComponent/>:  <Loading/>} />

    
        <Route exact path='/service/reviews/:id' element=
        {(user  && user.role==='admin')?<AllReviewsComponent/>:  <Loading/>} /> 

        <Route exact path='/admin/dashboard/each/worker' element=
        {(user  && user.role==='admin')?<EachWorkerComponent/>:  <Loading/>} /> 
        <Route exact path='/admin/dashboard/bookings/allOrders' element=
        {(user  && user.role==='admin')?<AllOrderComponent/>:  <Loading/>} />
        <Route exact path='/admin/dashboard/bookings/newOrders' element=
        {(user  && user.role==='admin')?<NewOrdersComponent/>: <Loading/>} />
        <Route exact path='/admin/dashboard/bookings/processing' element=
        {(user  && user.role==='admin')?<ProcessingOrdersComponent/>: <Loading/>} />
        <Route exact path='/admin/dashboard/bookings/completed' element=
        {(user  && user.role==='admin')?<CompletedOrdersComponent/>: <Loading/>} />
        <Route   path='/*' element={<Loading/>} />
        <Route exact path='/admin/dashboard/bookings/canceled' element=
        {(user  && user.role==='admin')?<CancelOrders/>: <Loading/>} />
        <Route   path='/*' element={<Loading/>} />
       </Routes>
       </div>
       <FooterComponent/>
       </BrowserRouter>
     
    </div> 
  );
}

export default App;
