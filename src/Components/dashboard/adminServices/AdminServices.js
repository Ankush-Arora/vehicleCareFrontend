import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../styles/Styles.css'
import './AdminServicesStyles.css'
// import React from 'react'
import { clearErrors, createService, deleteServiceMethod,updateService, getService } from '../../../actions/productActions'
import './AdminServicesStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { ADMIN_ADD_SERVICE_RESET, ADMIN_DELETE_SERVICE_RESET, ADMIN_UPDATE_SERVICE_RESET } from '../../../constants/serviceConstants';
import { useNavigate } from 'react-router';
// import './AdminServicesStyles.css'

const AdminServices = () => {


    const { services } = useSelector((state) => state.services);
    const { error,success:newServiceCreated } = useSelector((state) => state.newService);
    const {error: deleteError ,isDeleted}=useSelector((state)=>state.service)
    const {error: updatedError ,isUpdated}=useSelector((state)=>state.service)
    
    const dispatch = useDispatch();
    const alert1 = useAlert();
    const navigate=useNavigate();

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState("");
    const [searchingNames, setSearchingNames] = React.useState("");
    const [tagline, setTagline] = React.useState("");
    // Is service available or not
    const [serviceAvailable, setServiceAvailable] = React.useState();
    const [images, setImages] = React.useState([]);
    const [oldImages, setOldImages] = React.useState([]);
    // const [oldSameImages, setOldSameImages] = React.useState([]);
    const [imagesPreview, setImagesPreview] = React.useState([]);
    const [deleteService,setDeleteService]=React.useState({});
    const [updateServiceId,setUpdatedServiceId]=React.useState();


    const openAddServiceModalMethod = () => {
        const modalElement = document.getElementById('add-modal-service');
        modalElement.showModal();
    }

    const closeAddServiceModalMethod = () => {
        const element = document.getElementById('add-modal-service');
        element.close();
    }

    const handleSelectedChangeBoolean = (e) => {
            setServiceAvailable(e.target.value);
    }

    const deleteServiceHandler=(id)=>{
        dispatch(deleteServiceMethod(id));
        closeDeleteServiceModalMethod();
    }

    const openDeleteServiceModalMethod = (data) => {
        const modalElement = document.getElementById('delete-modal-service');
        setDeleteService(data);
        modalElement.showModal();
    }

    const closeDeleteServiceModalMethod = () => {
        const element = document.getElementById('delete-modal-service');
        element.close();
    }


    const openEditServiceModalMethod = (data) => {
        const modalElement = document.getElementById('edit-modal-service');
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setSearchingNames(data.searchingNames);
        setTagline(data.tagline);
        setServiceAvailable(data.serviceAvailable);
        setOldImages(data.images);
        // setOldSameImages(data.images);
        setUpdatedServiceId(data._id);
        modalElement.showModal();
    }

    const closeEditServiceModalMethod = () => {
        const element = document.getElementById('edit-modal-service');
        setName("");
        setPrice("");
        setDescription("");
        setSearchingNames("");
        setTagline("");
        setServiceAvailable("");
        setOldImages("");
        // setOldSameImages(data.images);
        setUpdatedServiceId("");
        element.close();
    }

    const createServiceSubmitHandler = (e) => {
        // alert('form has been submitted');
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("searchingNames",searchingNames);
        myForm.set("tagline",tagline);
        myForm.set("serviceAvailable",serviceAvailable);
        // myForm.set();
        images.forEach((image)=>{
            myForm.append("images",image);
        })
        dispatch(createService(myForm));
        // navigate('/admin/dashboard');
        closeAddServiceModalMethod();
    }

    const updateServiceSubmitHandler = (e) => {
        // alert('form has been submitted');
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("searchingNames",searchingNames);
        myForm.set("tagline",tagline);
        myForm.set("serviceAvailable",serviceAvailable);
        images.forEach((image)=>{
            myForm.append("images",image);
        })
         dispatch(updateService(updateServiceId,myForm));
        closeEditServiceModalMethod();
    }

    const fileServiceImagesHandler = (e) =>
    {
         
        const files=Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file)=>{
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2)
                {
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    
    }

    React.useEffect(() => {
        dispatch(getService());
        if(error)
        {
            if(error==='Please login first')
           { alert1.error('Login again session time out');
                navigate('/login');
            }
            else  
            alert1.error(error);
            dispatch(clearErrors());
        }

        if(updatedError)
        {
            if(updatedError==='Please login first')
           { alert1.error('Login again session time out');
                navigate('/login');
            }
            else
            alert1.error("Service not updated");
            dispatch(clearErrors());
        }
        if(newServiceCreated)
        {
            alert1.success("Service created successfully");
            dispatch({type:ADMIN_ADD_SERVICE_RESET});
            navigate('/admin/dashboard');
        }

        if(isUpdated)
        {
            alert1.success("Service updated successfully");
            navigate('/admin/dashboard');
            dispatch({type:ADMIN_UPDATE_SERVICE_RESET});
        }

        if(isDeleted)
        {
            alert1.success("Service has been deleted");
            navigate('/admin/dashboard');
            dispatch({type:ADMIN_DELETE_SERVICE_RESET});
        }
    }, [dispatch,error,alert1,newServiceCreated,deleteError,isDeleted,updatedError,isUpdated])

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9), createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    return (
        <div className='admin-services-container'>
            <div className='component-heading'><h1><p className='animation-heading'>All Services (ADMIN)</p></h1></div>
            <div>
                <button id='global-add-new-data' onClick={openAddServiceModalMethod}>Add new Service</button>

                {/* create service modal */}
                <dialog id='add-modal-service' className='edit-modal-class add-newService-inputs'>
                    <form encType='multipart/form-data' onSubmit={createServiceSubmitHandler}>
                        <h1>Add Service</h1>
                        <span>Name  : </span>
                        <input type='text' placeholder='service Name' required onChange={(e) => setName(e.target.value)} /><br />
                        <span>Price : </span>
                        <input type='number' placeholder='price' required onChange={(e) => setPrice(e.target.value)} /><br />
                        <span>Desc  :</span>
                        <input type='text' placeholder='description' required onChange={(e) => setDescription(e.target.value)} /><br />
                        <span>Search: </span>
                        <input type='text' placeholder='service searching names' required onChange={(e) => setSearchingNames(e.target.value)} /><br />
                        <span>Tag   : </span>
                        <input type='text' placeholder='service tagline' required onChange={(e) => setTagline(e.target.value)} /><br />
                        <span>Image :</span>
                        <input type='file' id='file-upload-input-global' name='avatar' accept='image/*' placeholder='upload image' onChange={fileServiceImagesHandler} multiple required /><br />
                        <div id='create-service-form-image'>
                            {
                                imagesPreview.map((image, idx) => (
                                    <img key={idx} src={image} alt='image not found' />
                                ))
                            }
                        </div>
                        <span>Service Available : &nbsp;&nbsp;
                            <select id='edit-dropdown' value={serviceAvailable} onChange={handleSelectedChangeBoolean} required>
                                <option >select</option>
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </select>
                        </span>
                        {/* <div>selected value is {serviceAvailable}</div> */}
                      
                        <div id='modal-buttons'>
                            <button type='submit'>Add Service</button>
                           
                            {/* <h4>you have selected {selectedOption}</h4> */}
                        </div>
                        </form>
                        <div  id='modal-buttons' >
                        <button onClick={closeAddServiceModalMethod} >Cancel</button></div>
                </dialog>

                {/* Edit and delete service modal dialog element */}

                <dialog id='edit-modal-service' className='edit-modal-class'>
                    <h1>Edit Service</h1>
                <form encType='multipart/form-data' onSubmit={updateServiceSubmitHandler}>
                    <span>Name  : </span>
                    <input type='text' placeholder='service Name' value={name} onChange={(e)=>setName(e.target.value)} required /><br />
                    <span>Price : </span>
                    <input type='number' placeholder='price' value={price}  onChange={(e)=>setPrice(e.target.value)} required /><br />
                    <span>Desc  :</span>
                    <input type='text' placeholder='description' value={description} onChange={(e)=>setDescription(e.target.value)}  required /><br />
                    <span>Search:</span>
                    <input type='text' placeholder='service searching names' value={searchingNames} onChange={(e)=>setSearchingNames(e.target.value)} required /><br />
                    <span>Tag   : </span>
                    <input type='text' placeholder='service tagline' value={tagline} onChange={(e)=>setTagline(e.target.value)}  required /><br />
                    <span>Image :</span>
                    <input type='file' id='file-upload-input-global' placeholder='upload image' name='avatar' accept='image/*' onChange={fileServiceImagesHandler} multiple  /><br />
                    
                    <div id='update-service-form-image'>
                            {
                               oldImages.length >0 && oldImages.map((image, idx) => (
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
                    <span>Service Available : &nbsp;&nbsp;
                        <select id='edit-dropdown' value={serviceAvailable} onChange={handleSelectedChangeBoolean} required>
                            <option>Select</option>
                            <option value='true'>true</option>
                            <option value='false'>false</option>
                        </select>
                    </span>
                    
                    <div id='modal-buttons'>
                        <button>Update</button>
                       
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                    </form>
                    <div id='modal-buttons'>
                    <button onClick={closeEditServiceModalMethod} >Cancel</button></div>
                   
                </dialog>


                {/* modal to delete account */}
                <dialog id='delete-modal-service' className='delete-modal-class'>
                    <h3>DELETE SERVICE</h3>
                    <hr id='line-horizontal-global'/>
                    <h4> Are you sure to delete {deleteService.name} service   </h4>
                    <div id='modal-buttons'>
                        <button onClick={()=>deleteServiceHandler(deleteService._id)}>Yes</button>
                        <button onClick={closeDeleteServiceModalMethod} >No</button>
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                </dialog>
                <div></div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>NAME</b></TableCell>
                                <TableCell ><b>ID</b></TableCell>
                                <TableCell ><b>PRICE</b></TableCell>
                                <TableCell ><b>SEARCH NAMES</b></TableCell>
                                <TableCell ><b>Available</b></TableCell>
                                <TableCell ><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services && services.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell >{row._id}</TableCell>
                                    <TableCell > ₹ &nbsp;{row.price}</TableCell>
                                    <TableCell >{row.searchingNames}</TableCell>
                                    <TableCell > {row.serviceAvailable ? 'true' : 'false'}</TableCell>
                                    <TableCell >
                                        <button id='edit-btn' onClick={() => openEditServiceModalMethod(row)}>Edit</button>
                                        &nbsp; <button id='delete-btn' onClick={() => openDeleteServiceModalMethod(row)}>Delete</button>
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

export default AdminServices
