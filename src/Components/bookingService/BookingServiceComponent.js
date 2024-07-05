import React, { useEffect, useState } from 'react'
import './BookingServiceStyles.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MetaData from '../navbar/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserMethod } from '../../actions/userActions';
import { createNewBooking } from '../../actions/bookingsAction'
import { useAlert } from 'react-alert';
import { BOOKING_CREATE_RESET, CLEAR_BOOKINGS_ERRORS } from '../../constants/bookingsConstants';
const BookingServiceComponent = () => {

  const [serviceName, setServiceName] = useState();
  const [serviceId, setServiceId] = useState();
  const [credentials, setCredentials] = useState({
    name: "", phoneNumber: "", houseNumber: ""
    , area: "", pincode: "", city: "", state: "", workDetails: "",vehicleName:"",vehicleNumber:""
  })
  const location = useLocation();
  const navigate = useNavigate();
  const alertMessage = useAlert();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { error: bookingError, bookingSuccess, createBooking } = useSelector((state) => state.addBooking);
  const dispatch = useDispatch();

  const onChangeEvent = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const createBookingSubmitHandler = (e) => {
    // alert('form has been submitted');
    e.preventDefault();

    // dispatch(createService(myForm));
    // navigate('/admin/dashboard');
    // closeAddServiceModalMethod();
    openCreateBookingModalMethod();
  }

  const createBookingConfirmation = () => {

    if (user) {
      const myForm = new FormData();
      myForm.set("user", user ? user._id : '');
      myForm.set("name", user ? user.name : '');
      myForm.set("email", user ? user.email : '');
      myForm.set("phoneNumber", credentials.phoneNumber);
      myForm.set("serviceName", serviceName);
      myForm.set("serviceId", serviceId);
      myForm.set("vehicleName", credentials.vehicleName);
      myForm.set("vehicleNumber", credentials.vehicleNumber);
      myForm.set("workDetails", credentials.workDetails);
      myForm.set("houseNumber", credentials.houseNumber);
      myForm.set("area", credentials.area);
      myForm.set("pincode", credentials.pincode);
      myForm.set("city", credentials.city);
      myForm.set("state", credentials.state);
      myForm.set("country", "INDIA");
      dispatch(createNewBooking(myForm));
    }
    else {
      alertMessage.error('Login Please!');
      navigate('/services');
    }
    closeCreateBookingModalMethod();
  }

  useEffect(() => {
    try {
      dispatch(loadUserMethod());
      setServiceName(location.state.serviceProp.name);
      setServiceId(location.state.serviceProp._id)
      // console.log("serviceId Ye ri = "+(location.state.serviceProp._id));
      if (bookingSuccess) {
        alertMessage.success("Service Booked Successfully!");
        dispatch({ type: BOOKING_CREATE_RESET });
        navigate('/services');
      }
      if (bookingError) {
        alertMessage.success("Not booked some error occured");
        dispatch({ type: CLEAR_BOOKINGS_ERRORS });
      }
    }
    catch (e) {
      setServiceName('Not selected');
      navigate('/services');
    }
  }, [dispatch, bookingSuccess, bookingError])

  const openCreateBookingModalMethod = () => {
    const modalElement = document.getElementById('create-booking-modal');
    modalElement.showModal();
  }

  const closeCreateBookingModalMethod = () => {
    const element = document.getElementById('create-booking-modal');
    element.close();
  }

  return (
    <> <div className='component-heading'><h1>Booking Service</h1></div>

      <dialog id='create-booking-modal' className='create-booking-modal-class'>
        <h3>CONFIRM BOOKING!!</h3>
        <hr id='line-horizontal-global' />
        <h4></h4>
        <div id='modal-buttons'>
          <button onClick={createBookingConfirmation} >Yes</button>
          <button onClick={closeCreateBookingModalMethod} >No</button>
          {/* <h4>you have selected {selectedOption}</h4> */}
        </div>
      </dialog>

      <div className='booking-service-container'>
        <MetaData title="Booking Page" />
        <form className='booking-service-inner' onSubmit={createBookingSubmitHandler}>
          <h4 style={{ color: 'green', fontWeight: 'bolder', fontSize: '1.5em' }}>  {serviceName} service </h4>
          <div className='input-heading'  >Service Name</div>
          <input type='text' value={serviceName} placeholder='enter service name' required />
          <div className='input-heading'>Vehicle Information</div>

          <div className='booking-address'>
            <div className='booking-address-flat-number'>
              <div>Number </div>
              <input type='text' placeholder='vehicleNumber' name='vehicleNumber' required onChange={(e) => onChangeEvent(e)} />
            </div>
            <div className='booking-address-area'>
              <div>Name</div>
              <input type='text' placeholder='vehicleName' name='vehicleName' required onChange={(e) => onChangeEvent(e)} />
            </div>
          </div>
          
          <div className='input-heading'>Enter phone number</div>
          <input type='number' placeholder='enter your number' required name='phoneNumber' onChange={(e) => onChangeEvent(e)} />
          <div className='input-heading'>Address</div>

          <div className='booking-address'>
            <div className='booking-address-flat-number'>
              <div>house no. </div>
              <input type='text' placeholder='house no/flat no' name='houseNumber' required onChange={(e) => onChangeEvent(e)} />
            </div>
            <div className='booking-address-area'>
              <div>area</div>
              <input type='text' placeholder='area' name='area' required onChange={(e) => onChangeEvent(e)} />
            </div>
            <div className='booking-address-pincode'>
              <div>pincode</div>
              <input type='number' placeholder='pincode' name='pincode' required onChange={(e) => onChangeEvent(e)} />
            </div>
          </div>

          <div className='booking-address'>
            <div className='booking-address-country'>
              <div>Country</div>
              <input type='text' placeholder='country' value={'India'} required />
            </div>
            <div className='booking-address-state'>
              <div>State</div>
              <input type='text' placeholder='state' name='state' required onChange={(e) => onChangeEvent(e)} />
            </div>
            <div className='booking-address-city'>
              <div>City</div>
              <input type='text' placeholder='city' name='city' required onChange={(e) => onChangeEvent(e)} />
            </div>
          </div>

          <div className='input-heading'>Work details </div>
          <textarea type='text' className='booking-text-area' name='workDetails' placeholder='Tell us about your project in short' onChange={(e) => onChangeEvent(e)} />
          <button type='submit' className='signup-btn' >Book Service</button>
        </form>
      </div></>
  )
}

export default BookingServiceComponent
