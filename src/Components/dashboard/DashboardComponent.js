import React, { Fragment, useEffect } from 'react'
import './DashboardStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../navbar/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserErrors, getAllUsersMethod } from '../../actions/userActions'
import { getService } from '../../actions/productActions'
import { Doughnut, Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import Loading from '../loading/Loading'
import { getAllBookings } from '../../actions/bookingsAction'
import { useAlert } from 'react-alert'
import { getAllWorkers } from '../../actions/workerAction'


const DashboardComponent = () => {

  const { loading, services } = useSelector((state) => state.services);
  const {workers}= useSelector((state)=>state.allWorkers);
  const { users, error } = useSelector((state) => state.allUsers);
  const { allBookings, error:bookingErrors } = useSelector((state) => state.allBookings);
  const [rows, setRows] = React.useState();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const alert=useAlert();

  const lineState = {
    labels: ["INITIAL ORDERS", "TOTAL ORDERS"],
    datasets: [
      {
        label: "All ORDERS",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["black"],
        data: [0, allBookings.length]
      }
    ]
  }

  React.useEffect(() => {
    const controller=new AbortController();
    if (error) {
      if (error==='Please login first') 
        {alert.error('Session time out login again');
          navigate('/');
      }
        else
        alert.error(error);
      dispatch(clearUserErrors());
    }
    setRows(users.length);
    dispatch(getAllUsersMethod());
    dispatch(getService());
    dispatch(getAllBookings());
    dispatch(getAllWorkers());
    //  console.log(users);
return ()=>{
  controller.abort();
}
  }, [dispatch, rows]);

  return (
   (loading==true)? <Fragment><Loading/></Fragment>:
    <><div className='component-heading'><h1><p className='animation-heading'>
      Admin Dashboard</p></h1></div>
      <div id='query-links' className='query-btn'>
      <ul>
      <li> <Link to='/customer/queries'>ALL QUERIES</Link> </li>
       {/* <li> <Link to='/customer/queries'>NEW QUERIES</Link> </li>
       <li> <Link to='/customer/queries'>RESOLVED QUERY</Link></li> */}
      </ul>
      </div> 

      <div className='dashboard-container'>
        <MetaData title="Dashboard" />
        <div className='services-details common-properties'>
          <span>Services</span>
          <h3>{services ? services.length : 0}</h3>
          <Link to='/admin/dashboard/services'><button id="dash-btn">Services</button></Link>
        </div>
        <div className='users-details common-properties'>
          <span>Users</span>
          <h3> {users ? users.length : 0} </h3>
          <Link to='/admin/dashboard/users'><button id="dash-btn">Users</button></Link>
        </div>
        <div className='booked-services common-properties'>
          <span>Bookings</span>
          <h3>{allBookings ? allBookings.length:0}</h3>
          <Link to='/admin/dashboard/bookings'><button id="dash-btn">Bookings</button></Link>
        </div>
        <div className='workers-details common-properties'>
          <span>Workers</span>
          <h3>{workers ? workers.length:0}</h3>
          <Link to='/admin/dashboard/workers'><button id="dash-btn">Workers</button></Link>
        </div>
      </div>
      
      <div className='lineChart'>
        <Line data={lineState} />
        </div>
   

      </>
  )
}

export default DashboardComponent
