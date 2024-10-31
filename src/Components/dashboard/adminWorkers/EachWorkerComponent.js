import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './EachWorkerStyles.css'
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../loading/Loading';


const EachWorkerComponent = () => {

    const navigate=useNavigate();

      const [workerDetails,setWorkerDetails]=React.useState(null);
    React.useEffect(()=>{
        const controller=new AbortController();
        try{
            if(location.state.workerProp!==null)
            setWorkerDetails(location.state.workerProp);
        }
        catch{
            setWorkerDetails(null);
            navigate('/');
            // window.location.reload();
        }
        return ()=>{
            controller.abort();
        }
    },[workerDetails])

    const location = useLocation();
    return (
        (workerDetails!==null)?
        <div className='each-worker-top'>
             <div className='component-heading'><h1><p className='animation-heading'>Admin Each Worker</p></h1></div>
            <div className='each-worker-image'>
                <div id='worker-image1'>
                { workerDetails!==null && workerDetails.images.length >= 1 ? <img src={location.state.workerProp.images[0].url} alt='image not found'></img>:<></>}
                </div>
                <div id='worker-image2'>
               {workerDetails!==null && workerDetails.images.length >= 2 ? <img src={location.state.workerProp.images[1].url} alt='image not found'></img>:<></>}
                     </div>
            </div>
            <div className='each-worker-details'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><b>WORKER</b></TableCell>
                                <TableCell align="left"> <b>DETAILS</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left"><b>WORKERID</b></TableCell>
                                <TableCell align="left"> { workerDetails!==null ? workerDetails._id:"" }</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><b>NAME</b></TableCell>
                                <TableCell align="left">{ workerDetails!==null ? workerDetails.name :""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><b>GOVERNMENT ID</b></TableCell>
                                <TableCell align="left">{workerDetails!==null ? workerDetails.governmentId:""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><b>PROFESSION</b></TableCell>
                                <TableCell align="left">{ workerDetails!==null ? workerDetails.profession:""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><b>NUMBER</b></TableCell>
                                <TableCell align="left">{ workerDetails!==null ? workerDetails.phoneNumber:""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><b>ADDRESS</b></TableCell>
                                <TableCell align="left">{ workerDetails!==null ? workerDetails.address.houseNumber:""},
                                { workerDetails!==null ? workerDetails.address.locality:""},{ workerDetails!==null ? workerDetails.address.pincode:""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">India,{ workerDetails!==null ? workerDetails.address.country:""},{workerDetails!==null ?  workerDetails.address.state:"" },
                                { workerDetails!==null ? workerDetails.address.city: ''}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>:<><Loading/></>
    )
}

export default EachWorkerComponent
