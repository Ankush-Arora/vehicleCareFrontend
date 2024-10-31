import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingMethod, getAllBookings } from '../../../../actions/bookingsAction';
import moment from 'moment'; 
import { useNavigate } from 'react-router';
 import './CancelOrdersStyles.css'
import Loading from '../../../loading/Loading';
const CancelOrders = () => {
    const dispatch = useDispatch();
    const [bookingDetails, setBookingDetails] = React.useState();
    const { loading,allBookings, error: bookingErrors } = useSelector((state) => state.allBookings);
    const navigate = useNavigate();

    const deleteBookingHandler = (id, email) => {
        dispatch(deleteBookingMethod(id, email));
    }

    const openEditBookingModalMethod = (data) => {
        setBookingDetails(data);
        const modalElement = document.getElementById('edit-booking-modal');
        modalElement.showModal();
    }

    const closeEditBookingModalMethod = () => {
        const element = document.getElementById('edit-booking-modal');
        element.close();
    }

    React.useEffect(() => {
        const controller=new AbortController();
        dispatch(getAllBookings());
        return ()=>{
            controller.abort();
        }
    }, [dispatch]);

    return (
        (loading)?<React.Fragment><Loading/></React.Fragment>:
        <div className='cancelled-orders-main-container'>
            <div className='component-heading'><h1><p className='animation-heading'>CANCELLED ORDERS</p></h1></div>

            {/* <h1>Admin users</h1> */}
            <dialog id='edit-booking-modal' className='edit-booking-modal-class'>
                <h1>CANCELED ORDERS DETAILS</h1>
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
                 
                <div id='modal-buttons'>
                   <button onClick={closeEditBookingModalMethod} >Cancel</button>
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
                            <TableCell ><b>Actions </b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allBookings && allBookings.map((row, idx) =>
                            row.bookingStatus === 'cancel' || row.bookingStatus ==='cancelled by customer' ?
                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                    <TableCell component="th" scope="row">  {row._id}   </TableCell>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell >{row.serviceName}</TableCell>
                                    <TableCell > {row.phoneNumber}</TableCell>
                                    <TableCell >  {row.bookingStatus==='cancel'? 'cancelled':row.bookingStatus}  </TableCell>
                                    <TableCell >
                                        <button id='edit-btn' onClick={() => openEditBookingModalMethod(row)} >View</button>
                                        {/* <button id='delete-btn' onClick={() => openDeleteBookingModalMethod(row)}  >Delete</button> */}
                                    </TableCell>
                                </TableRow> : ''
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CancelOrders
