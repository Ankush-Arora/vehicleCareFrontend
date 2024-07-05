import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingMethod, getAllBookings, updateBookingStatus } from '../../../../actions/bookingsAction';
import './AllOrdersStyles.css'
import moment from "moment";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';
import { BOOKING_DELETE_RESET, BOOKING_UPDATE_RESET, CLEAR_BOOKINGS_ERRORS } from '../../../../constants/bookingsConstants';
import Loading from '../../../loading/Loading';

const AllOrderComponent = () => {
    const {loading, allBookings, error: bookingErrors } = useSelector((state) => state.allBookings);
    const { error: bookingError, isBookingUpdated, isBookingDeleted } = useSelector((state) => state.updateBooking);
    const dispatch = useDispatch();
    const alertMessage = useAlert();
    const [bookingDetails, setBookingDetails] = React.useState();
    const [statusUpdatedValue, setStatusUpdatedValue] = React.useState();
    const [deletedBookingEmail, setDeletedBookingEmail] = React.useState();
    const [deletedBookingId, setDeletedBookingId] = React.useState();
    const navigate = useNavigate();
    const [input, setInput] = React.useState('all');
    const [searchInput, setSearchInput] = React.useState('all');

  const updateInput = (val) => {
    setInput(val.target.value.toLowerCase().trim());
  }
    // const[oldStatusValue,setOldStatus]=React.useState();

    const updateBookingHandle = (id, data) => {
        if (data == undefined || data === 'select') {
            alertMessage.error('please select valid booking status');
        }
        else {
            const sendData = { "changeBookingStatus": data }
            dispatch(updateBookingStatus(id, sendData));
            closeEditBookingModalMethod();
        }
    }
    const deleteBookingHandler = (id, email) => {
        dispatch(deleteBookingMethod(id, email));
        closeDeleteBookingModalMethod();
    }

    const openDeleteBookingModalMethod = (data) => {
        const modalElement = document.getElementById('delete-booking-modal');
        setDeletedBookingEmail(data.email);
        setDeletedBookingId(data._id);
        modalElement.showModal();
    }

    const closeDeleteBookingModalMethod = () => {
        const element = document.getElementById('delete-booking-modal');
        element.close();
    }


    const openEditBookingModalMethod = (data) => {
        setBookingDetails(data);
        setStatusUpdatedValue(data.bookingStatus);
        const modalElement = document.getElementById('edit-booking-modal');
        modalElement.showModal();
    }

    const closeEditBookingModalMethod = () => {
        const element = document.getElementById('edit-booking-modal');
        element.close();
    }

    React.useEffect(() => {
        dispatch(getAllBookings());
        if(bookingError)
        {
            if(bookingError==='Please login first')
           { alertMessage.error('Login again session time out');
                navigate('/login');
            }
            else
            alertMessage.success(bookingError);
            dispatch({ type: CLEAR_BOOKINGS_ERRORS });
        }
        if (isBookingUpdated) {
            alertMessage.success('Booking Status Updated!');
            dispatch({ type: BOOKING_UPDATE_RESET });
            navigate('/admin/dashboard/bookings');
        }
        if (isBookingDeleted) {
            alertMessage.success('Booking Deleted!');
            dispatch({ type: BOOKING_DELETE_RESET });
            navigate('/admin/dashboard/bookings');
        }
    }, [dispatch,bookingError, isBookingUpdated, isBookingDeleted])

    return (
        (loading)?<React.Fragment><Loading/></React.Fragment>:
        <div className='all-orders-top'>
            <div className='component-heading'><h1><p className='animation-heading'>ALL ORDERS</p></h1></div>
            {/* <h1>Admin users</h1> */}
            <div className='search-input-container' id='all-booked-orders-search'>
                <input type='text' className='search-input' placeholder='search order by BOOKING_ID , EMAIL , PHONE_NUMBER OR NAME ' onChange={updateInput} />
                <button className='site-btn' onClick={() => setSearchInput(input)}>Search</button>
            </div>
            <dialog id='edit-booking-modal' className='edit-booking-modal-class'>
                <h1>ORDER DETAILS</h1>
                {bookingDetails ? <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>HEADING</TableCell>
                                <TableCell >DETAILS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>SERVICE NEEDED</b></TableCell>
                                <TableCell >{bookingDetails.serviceName} </TableCell> </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>NAME/NUMBER</b></TableCell>
                                <TableCell ><b>{bookingDetails.vehicleName.toUpperCase()} &nbsp; {bookingDetails.vehicleNumber.toUpperCase()}</b></TableCell> </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>NAME</b></TableCell>
                                <TableCell >{bookingDetails.name} </TableCell> </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>EMAIL</b></TableCell>
                                <TableCell >{bookingDetails.email} </TableCell> </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>PHONE NUMBER</b></TableCell>
                                <TableCell >{bookingDetails.phoneNumber} </TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>ADDRESS</b></TableCell>
                                <TableCell >{bookingDetails.address.houseNumber},{bookingDetails.address.area},{bookingDetails.address.pincode}  </TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ></TableCell>
                                <TableCell >{bookingDetails.address.city},{bookingDetails.address.state},{bookingDetails.address.country}</TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>BOOKING STATUS</b></TableCell>
                                <TableCell ><b>{bookingDetails.bookingStatus ==='cancel'?'cancelled':bookingDetails.bookingStatus}</b> </TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>BOOKING ID</b></TableCell>
                                <TableCell >{bookingDetails._id} </TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>WORK DETAILS</b></TableCell>
                                <TableCell >{bookingDetails.workDetails} </TableCell> </TableRow>

                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>USER ID</b></TableCell>
                                <TableCell >{bookingDetails.user} </TableCell> </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell ><b>BOOKED AT</b></TableCell>
                                <TableCell ><b>{moment(bookingDetails.bookedAt).format('MMMM Do YYYY, h:mm:ss a')} </b> </TableCell> </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer> : ''}
                <span id='edit-booking-modal-heading'>Booking Status  : &nbsp;&nbsp;
                    <select id='edit-dropdown' value={statusUpdatedValue} onChange={(e) => setStatusUpdatedValue(e.target.value)} required>
                        <option >select</option>
                        <option value='booked' >booked</option>
                        <option value='processing' >processing</option>
                        <option value='completed' >completed</option>
                        <option value='cancel' >cancel</option>
                    </select></span>
                <div id='modal-buttons'>
                    <button onClick={() => updateBookingHandle(bookingDetails ? bookingDetails._id : '', statusUpdatedValue)} >Update</button>
                    <button onClick={closeEditBookingModalMethod} >Cancel</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>


            {/* modal to delete account */}
            <dialog id='delete-booking-modal' className='delete-booking-modal-class'>
                <h3>DELETE</h3>
                <hr id='line-horizontal-global' />
                <h4> Are you sure to delete {deletedBookingEmail} booking?  </h4>
                <div id='modal-buttons'>
                    <button onClick={() => deleteBookingHandler(deletedBookingId, deletedBookingEmail)}  >Yes</button>
                    <button onClick={closeDeleteBookingModalMethod} >No</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>BOOKING_ID</b></TableCell>
                            <TableCell ><b>NAME</b></TableCell>
                            <TableCell ><b>Needed Service</b></TableCell>
                            <TableCell ><b>PHONE</b></TableCell>
                            <TableCell ><b>STATUS</b></TableCell>
                            <TableCell ><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allBookings && allBookings.map((row, idx) =>
                      row.name.toLowerCase().includes(searchInput.toLowerCase().trim()) ||  row.email.includes(searchInput.toLowerCase().trim()) || row.phoneNumber.toString().includes(searchInput.toLowerCase().trim())  
                     || row._id.toString().includes(searchInput.toLowerCase().trim()) || searchInput.toLowerCase().trim() === 'all' ? (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell component="th" scope="row">  {row._id}   </TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.serviceName}</TableCell>
                                <TableCell > {row.phoneNumber}</TableCell>
                                <TableCell >  {row.bookingStatus}  </TableCell>
                                <TableCell >
                                    <button id='edit-btn' onClick={() => openEditBookingModalMethod(row)} >View</button>
                                    &nbsp; <button id='delete-btn' onClick={() => openDeleteBookingModalMethod(row)}  >Delete</button>
                                </TableCell>
                            </TableRow>
                        ):<></>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AllOrderComponent
