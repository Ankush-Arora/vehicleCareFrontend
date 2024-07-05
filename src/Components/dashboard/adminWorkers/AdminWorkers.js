import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../styles/Styles.css'
import './AdminWorkersStyles.css'
import { createWorker, deleteWorkerMethod, getAllWorkers, updateWorkerMethod } from '../../../actions/workerAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { CLEAR_WORKER_ERRORS, DELETE_WORKER_RESET, NEW_WORKER_RESET, UPDATE_WORKER_RESET } from '../../../constants/workerConstants';

const AdminWorkers = () => {

    const [name, setName] = React.useState("");
    const [profession, setProfession] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [governmentId, setGovernmentId] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [oldImages, setOldImages] = React.useState([]);
    const [imagesPreview, setImagesPreview] = React.useState([]);
    const [locality, setLocality] = React.useState("");
    const [country, setCountry] = React.useState("India");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [houseNumber, setHouseNumber] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertMessage=useAlert();
    const [deleteWorkerName, setDeleteWorkerName] = React.useState("");
    const [deleteWorkerId, setDeleteWorkerID] = React.useState("");
    const [updatedWorkerId,setUpdatedWorkerId]=React.useState("");

    const {success,error}=useSelector((state)=>state.newWorker);
    const {isWorkerDeleted,deletedMessage,isWorkerUpdated,error:deletedError }=useSelector((state)=>state.worker);


    const openAddWorkerModalMethod = () => {
        const modalElement = document.getElementById('addNew-modal-worker');
        modalElement.showModal();
    }

    const {workers}=useSelector((state)=>state.allWorkers);

    const closeAddWorkerModalMethod = () => {
        const element = document.getElementById('addNew-modal-worker');
        element.close();
    }

    const openDeleteWorkerModalMethod = (data) => {
        const modalElement = document.getElementById('delete-modal-worker');
        setDeleteWorkerName(data.name);
        setDeleteWorkerID(data._id);
        modalElement.showModal();
    }

    const closeDeleteWorkerModalMethod = () => {
        const element = document.getElementById('delete-modal-worker');
        element.close();
    }


    const openEditWorkerModalMethod = (data) => {
        const modalElement = document.getElementById('edit-modal-worker');
        setName(data.name);
        setProfession(data.profession);
        setPhoneNumber(data.phoneNumber);
        setGovernmentId(data.governmentId);
        setHouseNumber(data.address.houseNumber);
        setLocality(data.address.locality);
        setCity(data.address.city);
        setCountry('India');
        setState(data.address.state);
        setPincode(data.address.pincode);
        setOldImages(data.images);
        setUpdatedWorkerId(data._id);
        modalElement.showModal();
    }

    const closeEditWorkerModalMethod = () => {
        const element = document.getElementById('edit-modal-worker');
        setName("");
        setProfession("");
        setPhoneNumber("");
        setGovernmentId("");
        setHouseNumber("");
        setLocality("");
        setCity("");
        setCountry("");
        setState("");
        setPincode("");
        setOldImages("");
        setUpdatedWorkerId("");
        element.close();
    }

    const deleteWorkerHandlerMethod=()=>{
         dispatch(deleteWorkerMethod(deleteWorkerId));
         closeDeleteWorkerModalMethod();
    }
 
    const createWorkerSubmitHandler = (e) => {
        // alert('form has been submitted');
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("profession", profession);
        myForm.set("phoneNumber", phoneNumber);
        myForm.set("governmentId", governmentId);
        myForm.set("locality", locality);
        myForm.set("country", country);
        myForm.set("houseNumber", houseNumber);
        myForm.set("state", state);
        myForm.set("city", city);
        myForm.set("pincode", pincode);
        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(createWorker(myForm));
        closeAddWorkerModalMethod();
    }

    const updateWorkerSubmitHandler = (e) => {
        // alert('form has been submitted');
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("profession", profession);
        myForm.set("phoneNumber", phoneNumber);
        myForm.set("governmentId", governmentId);
        myForm.set("locality", locality);
        myForm.set("country", country);
        myForm.set("houseNumber", houseNumber);
        myForm.set("state", state);
        myForm.set("city", city);
        myForm.set("pincode", pincode);
        images.forEach((image) => {
            myForm.append("images", image);
        })
        dispatch(updateWorkerMethod(updatedWorkerId,myForm));
        closeEditWorkerModalMethod();
    }

    const fileServiceImagesHandler = (e) => {

        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })

    }

        React.useEffect(()=>{
                dispatch(getAllWorkers());
                if(success)
                {
                    alertMessage.success("Worker details has been added");
                    dispatch({type:NEW_WORKER_RESET})
                    navigate('/admin/dashboard');
                }
                if(isWorkerUpdated)
                {
                    alertMessage.success("Worker details updated successfully");
                    dispatch({type:UPDATE_WORKER_RESET})
                    navigate('/admin/dashboard');
                }
                if(isWorkerDeleted)
                {
                    alertMessage.success(deletedMessage);
                    dispatch({type:DELETE_WORKER_RESET})
                    navigate('/admin/dashboard');
                }
                if(error)
                {
                    alertMessage.error("Not Added Image size is to Large");
                    dispatch({type:CLEAR_WORKER_ERRORS})
                }
                if(deletedError)
                {
                    alertMessage.error("Worker not deleted some error occured");
                    dispatch({type:CLEAR_WORKER_ERRORS})
                }
        },[dispatch,success,error,isWorkerDeleted,isWorkerUpdated,deletedError])

    return (
        <div className='all-workers-top'>
            <div className='component-heading'><h1><p className='animation-heading'>Admin All Workers</p></h1></div>
            {/* <h1>All Workers</h1> */}
            <button id='global-add-new-data' onClick={openAddWorkerModalMethod}>Add new worker</button>
            <dialog id='addNew-modal-worker' className='edit-modal-class addNew-worker-modal-form'>
                <form encType='multipart/form-data' onSubmit={createWorkerSubmitHandler}>
                    <h1>Add new worker</h1>
                    <span>Name: </span>
                    <input type='text' placeholder='worker name' onChange={(e) => setName(e.target.value)} required /><br />
                    <span>Work : </span>
                    <input type='text' placeholder='work or profession' onChange={(e) => setProfession(e.target.value)} required /><br />
                    <span>Phone  :</span>
                    <input type='number' placeholder='phone number' onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
                    <span>Gov Id : </span>
                    <input type='text' placeholder='Government Id' onChange={(e) => setGovernmentId(e.target.value)} required /><br />
                    <span>Photos: </span>
                    <input type='file' id='file-upload-input-global' name='avatar' accept='image/*' placeholder='upload image' onChange={fileServiceImagesHandler} multiple required /><br />
                    <div id='create-service-form-image'>
                        {
                            imagesPreview.map((image, idx) => (
                                <img key={idx} src={image} alt='image not found' />
                            ))
                        }
                    </div>
                    <span>Address: </span>
                    <div>
                        <div className='booking-address'>
                            <div className='booking-address-flat-number'>
                                <div>num.</div>
                                <input type='text' placeholder='flat no' onChange={(e) => setHouseNumber(e.target.value)} required />
                            </div>
                            <div className='booking-address-area'>
                                <div>area</div>
                                <input type='text' placeholder='area' onChange={(e) => setLocality(e.target.value)} required />
                            </div>
                            <div className='booking-address-pincode'>
                                <div>pincode</div>
                                <input type='number' placeholder='pincode' name='pincode' onChange={(e) => setPincode(e.target.value)} required />
                            </div>
                        </div>
                        <div className='booking-address'>
                            <div className='booking-address-country'>
                                <div>Country</div>
                                <input type='text' placeholder='country' value={'India'} required />
                            </div>
                            <div className='booking-address-state'>
                                <div>State</div>
                                <input type='text' placeholder='state' name='state' onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div className='booking-address-city'>
                                <div>City</div>
                                <input type='text' placeholder='city' name='city' onChange={(e) => setCity(e.target.value)} required />
                            </div>
                        </div>
                    </div>

                    <div id='modal-buttons'>
                        <button type='submit'>Add</button>
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                </form>
                <div id='modal-buttons'>
                    <button onClick={closeAddWorkerModalMethod} >Cancel</button>
                </div>
            </dialog>

            <dialog id='edit-modal-worker' className='edit-modal-class'>
                <form encType='multipart/form-data' onSubmit={updateWorkerSubmitHandler}>
                <h1>Edit worker</h1>
                    <span>Name: </span>
                    <input type='text' placeholder='worker name' value={name} onChange={(e) => setName(e.target.value)} required /><br />
                    <span>Work : </span>
                    <input type='text' placeholder='work or profession' value={profession} onChange={(e) => setProfession(e.target.value)} required /><br />
                    <span>Phone  :</span>
                    <input type='number' placeholder='phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
                    <span>Gov Id : </span>
                    <input type='text' placeholder='Government Id' value={governmentId} onChange={(e) => setGovernmentId(e.target.value)} required /><br />
                    <span>Photos: </span>
                    <input type='file' id='file-upload-input-global' placeholder='upload image' name='avatar' accept='image/*' onChange={fileServiceImagesHandler} multiple /><br />

                    <div id='update-service-form-image'>
                        {
                            oldImages.length > 0 && oldImages.map((image, idx) => (
                                <img key={idx} src={image.url} alt='image not found' />
                            ))
                        }
                    </div>
                    <div id='update-service-form-image'>
                        {
                            imagesPreview.map((image, idx) => (
                                <img key={idx} src={image} alt='image not found' />
                            ))
                        }
                    </div>
                    <span>Address: </span>
                    <div>
                        <div className='booking-address'>
                            <div className='booking-address-flat-number'>
                                <div>num.</div>
                                <input type='text' placeholder='flat no' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
                            </div>
                            <div className='booking-address-area'>
                                <div>area</div>
                                <input type='text' placeholder='area' value={locality} onChange={(e) => setLocality(e.target.value)} required />
                            </div>
                            <div className='booking-address-pincode'>
                                <div>pincode</div>
                                <input type='number' placeholder='pincode' value={pincode} name='pincode' onChange={(e) => setPincode(e.target.value)} required />
                            </div>
                        </div>
                        <div className='booking-address'>
                            <div className='booking-address-country'>
                                <div>Country</div>
                                <input type='text' placeholder='country' value={'India'} required />
                            </div>
                            <div className='booking-address-state'>
                                <div>State</div>
                                <input type='text' placeholder='state' name='state' value={state} onChange={(e) => setState(e.target.value)} required />
                            </div>
                            <div className='booking-address-city'>
                                <div>City</div>
                                <input type='text' placeholder='city' name='city' value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                        </div>
                    </div>

                    <div id='modal-buttons'>
                        <button>Update</button>
                    </div></form>
                <div id='modal-buttons'>
                    <button onClick={closeEditWorkerModalMethod} >Close</button>
                </div>
            </dialog>


            {/* modal to delete account */}
            <dialog id='delete-modal-worker' className='delete-modal-class'>
                <h3>Delete account</h3>
                <h4> Are you sure to delete worker {deleteWorkerName?deleteWorkerName:""}?    </h4>
                <div id='modal-buttons'>
                    <button onClick={deleteWorkerHandlerMethod}>Yes</button>
                    <button onClick={closeDeleteWorkerModalMethod} >No</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">WorkerID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Number</TableCell>
                                <TableCell align="left">Profession</TableCell>
                                <TableCell align="left">GovernmentID</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { workers && workers.map((row,idx) => (
                                <TableRow  key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell align="left">{row._id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.phoneNumber}</TableCell>
                                    <TableCell align="left">{row.profession}</TableCell>
                                    <TableCell align="left">{row.governmentId}</TableCell>
                                    <TableCell align="left">
                                        <button id='edit-btn' onClick={() => openEditWorkerModalMethod(row)}>Edit</button>
                                        &nbsp; <button id='delete-btn' onClick={() => openDeleteWorkerModalMethod(row)}>Delete</button>
                                        &nbsp;<Link to='/admin/dashboard/each/worker' state={{ workerProp: row }} ><button id='edit-btn' >view</button></Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AdminWorkers
