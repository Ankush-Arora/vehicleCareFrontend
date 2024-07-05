import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './QueriesDetailsStyles.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { clearQueryErrors, deleteQueryMethod, getAllQueries, updateQueryMethod } from '../../../actions/queryAction';
import { CLEAR_QUERY_ERRORS, QUERY_DELETE_RESET, QUERY_UPDATE_RESET } from '../../../constants/QueryConstants';
import { useAlert } from 'react-alert';

const QueriesDetailsComponent = () => {

    const [filterBy, setFilterBy] = React.useState('RESOLVED NEW QUERY');
    const { queries, error } = useSelector((state) => state.allQueries);
    const { isQueryUpdated, deletedMessage, isQueryDeleted } = useSelector((state) => state.updateQuery);
    const dispatch = useDispatch();
    const alertMessage = useAlert();
    const [selectedData, setSelectedData] = React.useState({});
    const [selectQueryStatus, setSelectQueryStatus] = React.useState();

    const aray = [
        { name: "anand", status: "NEW" },
        { name: "madan", status: "RESOLVED" },
        { name: "nater", status: "NEW" },
        { name: "vinod", status: "RESOLVED" },
        { name: "rakesh", status: "NEW" },
        { name: "avdesh", status: "RESOLVED" },
        { name: "girish", status: "RESOLVED" },
        { name: "mohan", status: "RESOLVED" },
        { name: "ankush", status: "NEW" },

    ]

    const openDeleteQueryModalMethod = (data) => {
        const modalElement = document.getElementById('delete-modal');
        setSelectedData(data);
        modalElement.showModal();
    }

    const closeDeleteQueryModalMethod = () => {
        const element = document.getElementById('delete-modal');
        element.close();
    }


    const openEditQueryModalMethod = (data) => {
        const modalElement = document.getElementById('edit-modal');
        setSelectedData(data);
        modalElement.showModal();
    }

    const closeEditQueryModalMethod = () => {
        const element = document.getElementById('edit-modal');
        element.close();
    }

    const queryUpdateHandler = () => {
        const updatedStatus = {
            "queryStatus": selectQueryStatus
        }
        dispatch(updateQueryMethod(selectedData._id, updatedStatus));
        closeEditQueryModalMethod();
    }

    React.useEffect(() => {
        dispatch(getAllQueries());
        if (error) {
            alertMessage.error(error);
            dispatch(clearQueryErrors())
        }
        // console.log(isQueryUpdated);
        if (isQueryUpdated) {
            alertMessage.success("Query status has been updated");
            dispatch({ type: QUERY_UPDATE_RESET });
        }
        if (isQueryDeleted) {
            alertMessage.success(deletedMessage);
            dispatch({ type: QUERY_DELETE_RESET });
        }
    }, [dispatch, isQueryUpdated, isQueryDeleted]);

    const handleSelectedChange = (e) => {
        setFilterBy(e.target.value);
    }
    return (
        <div>
            <div className='component-heading'><h1><p className='animation-heading'>User's Queries</p></h1></div>

            <dialog id='edit-modal' className='edit-modal-class'>
                <h1>Edit Query</h1>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>HEADING</b></TableCell>
                            <TableCell ><b>DETAILS</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>NAME</b></TableCell>
                            <TableCell > {selectedData.name} </TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>EMAIL</b></TableCell>
                            <TableCell > {selectedData.email} </TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>PHONE NUMBER</b></TableCell>
                            <TableCell > {selectedData.phoneNumber} </TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>MESSAGE</b></TableCell>
                            <TableCell > {selectedData.message}  </TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>QUERY STATUS</b></TableCell>
                            <TableCell ><b>{selectedData.queryStatus} </b></TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>QUERY ID</b></TableCell>
                            <TableCell > {selectedData._id} </TableCell> </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCell ><b>QUERY AT</b></TableCell>
                            <TableCell ><b>{moment(selectedData.queryAt).format('MMMM Do YYYY, h:mm:ss a')} </b> </TableCell> </TableRow>
                    </TableBody>
                </Table>
                <span id='edit-modal-heading'>RESOLVE QUERY  : &nbsp;&nbsp;
                    <select id='edit-dropdown' value={selectQueryStatus} onChange={(e) => setSelectQueryStatus(e.target.value == undefined || e.target.value === 'select' ? 'NEW QUERY' : e.target.value === 'NEW QUERY' ? 'NEW' : 'RESOLVED')} required>
                        <option >select</option>
                        <option value='NEW QUERY' >New  </option>
                        <option value='RESOLVED' >Resolved</option>
                    </select>
                </span>
                <div id='modal-buttons'>
                    <button onClick={queryUpdateHandler} >Update</button>
                    <button onClick={closeEditQueryModalMethod} >Cancel</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>


            {/* modal to delete account */}
            <dialog id='delete-modal' className='delete-modal-class'>
                <h3>DELETE</h3>
                <hr id='line-horizontal-global' />
                <h4> Are you sure to delete {selectedData.email} query?  </h4>
                <div id='modal-buttons'>
                    <button onClick={() => { dispatch(deleteQueryMethod(selectedData._id)); closeDeleteQueryModalMethod(); }} >Yes</button>
                    <button onClick={closeDeleteQueryModalMethod} >No</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>

            <div className='sorting-filter'>
                <button className='filter-btn'> <sub><FilterAltIcon /></sub>   FILTER</button>
                <select id='edit-dropdown' value={filterBy} onChange={handleSelectedChange} required>
                    <option value='RESOLVED NEW QUERY'>All</option>
                    <option value='NEW QUERY' >New  </option>
                    <option value='RESOLVED' >Resolved</option>
                </select>
                {/* {filterBy} */}
                {/* <h1>hello {getOptionLabel.title}</h1> */}
            </div>

            <div className='queries-table-main'>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>QUERY_ID</b></TableCell>
                            <TableCell ><b>NAME</b></TableCell>
                            <TableCell><b>EMAIL</b></TableCell>
                            <TableCell ><b>MESSAGE</b></TableCell>
                            <TableCell ><b>STATUS</b></TableCell>
                            <TableCell ><b>PHONE</b></TableCell>
                            <TableCell ><b>ACTIONS</b></TableCell>
                        </TableRow>
                    </TableHead>
                    {queries && queries.map((each, idx) =>
                        each.queryStatus.includes(filterBy) || filterBy.includes(each.queryStatus) ?
                            <TableBody >
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={idx}  >
                                    <TableCell ><b>{each._id}</b></TableCell>
                                    <TableCell >{each.name} </TableCell>
                                    <TableCell >{each.email}</TableCell>
                                    <TableCell >{each.message}</TableCell>
                                    <TableCell >{each.queryStatus}</TableCell>
                                    <TableCell >{each.phoneNumber}</TableCell>
                                    <TableCell ><button id='edit-btn' onClick={() => openEditQueryModalMethod(each)} >Edit</button>
                                        &nbsp;<button id='delete-btn' onClick={() => openDeleteQueryModalMethod(each)}>Delete</button>
                                    </TableCell> </TableRow>
                            </TableBody> : <></>)}
                </Table>

            </div>
        </div>
    )
}

export default QueriesDetailsComponent
