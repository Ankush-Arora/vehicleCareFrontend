import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './AdminUsersStyles.css'
import '../../styles/Styles.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllUsersReducer } from '../../../reducers/userReducer';
import { clearUserErrors, deleteUserMethod, getAllUsersMethod, updateUserRoleUserMethod } from '../../../actions/userActions';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { ADMIN_DELETE_USER_RESET, ADMIN_UPDATE_USER_RESET } from '../../../constants/userConstants';

const AdminUsers = () => {

    const {loading,users,error}=useSelector((state)=>state.allUsers);
    const {isDeleted,message,isUpdated,error:userError}=useSelector((state)=>state.profile);
    const {isAuthenticated,user}=useSelector((state)=>state.user);
        const dispatch=useDispatch();

    const openDeleteModalMethod = (data) => {
        const modalElement = document.getElementById('delete-modal');
        setDeleteAccount(data);
        modalElement.showModal();
    }

     
    const deleteUserHandler=(id)=>{
        // alert('deleted data');
            dispatch(deleteUserMethod(id));
            closeDeleteModalMethod();
    }

    const closeDeleteModalMethod = () => {
        const element = document.getElementById('delete-modal');
        element.close();
    }


    const openEditModalMethod = (data) => {
        const modalElement = document.getElementById('edit-modal');
        setUpdateRole(data);
        modalElement.showModal();
    }

    const closeEditModalMethod = () => {
        const element = document.getElementById('edit-modal');
        element.close();
    }

    const [updateRole, setUpdateRole] = React.useState({});
    const [deleteAccount, setDeleteAccount] = React.useState({});
    const [selectedOption, setSelectedOption] = React.useState();
    // const [rows,setRows]=React.useState([]);
    const [deleted,setSeleted]=React.useState(true);
    const alert1=useAlert();
    const [input,setInput]=React.useState('all');
    const [searchInput, setSearchInput] = React.useState('all');

    const updateInput = (val) => {
      setInput(val.target.value.toLowerCase().trim());
    }

    const handleSelectedChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const updateRoleHandle=(id,finalRole)=>{
            if(!finalRole || finalRole==='select') finalRole='user'
            // alert(id+','+finalRole);
            const myData={role:finalRole}
            dispatch(updateUserRoleUserMethod(id,myData));
            closeEditModalMethod();
    }

   

    React.useEffect(()=>{
        const controller=new AbortController();
        if(error)
        {
            if(error==='Please login first')
           { alert1.error('Login again session time out');
                navigate('/login');
            }
            else
            alert1.error(error);
            dispatch(clearUserErrors());
        }
        if(userError)
        {
            if(userError==='Please login first')
           { alert1.error('Login again session time out');
                navigate('/login');
            }
            else
            alert1.error(userError);
            dispatch(clearUserErrors());
        }
        if(error)
        {
            alert1.error(error);
            dispatch(clearUserErrors());
        }
        if(isDeleted)
        {
            alert1.success(message);
            dispatch({type:ADMIN_DELETE_USER_RESET});
        }
        if(isUpdated)
        {
            alert1.success("User Role Updated!" );
           dispatch({type:ADMIN_UPDATE_USER_RESET});
            // navigate('/admin/dashboard');
        }
         dispatch(getAllUsersMethod());
         return ()=>{
            controller.abort();
         }
    },[dispatch,isUpdated,isDeleted,userError]);
    const navigate=useNavigate();


    // const rows = [
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Amitab bachan", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', "Anand Singh Negi", "admin", "Edit"),
    //     createData('65832651cadeee0dae36de36', 'ankusharorakumar5551@gmail.com', "madan mohan pant", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankush5551@gmail.com', "Ankush", "user", "Delete"),
    //     createData('65832651cadeee0dae36de36', 'ankusharora5551@gmail.com', " Akshay Kumar", "user", "Edit"),
    // ];

    return (
        <div className='admin-user-main'>
            <div className='component-heading'><h1><p className='animation-heading'>All users (ADMIN)</p></h1></div>
            {/* <h1>Admin users</h1> */}
            <div className='search-input-container' id='all-booked-orders-search'>
                <input type='text' className='search-input' placeholder='search user by USER_ID , EMAIL , ROLE OR NAME ' onChange={updateInput} />
                <button className='site-btn' onClick={() => setSearchInput(input)}>Search</button>
            </div>
            <dialog id='edit-modal' className='edit-modal-class'>
                <h1>Edit role</h1>
                <div><span id='edit-modal-heading'>Name: </span> <span id='edit-modal-details'>{updateRole.name}</span></div>
                <div><span id='edit-modal-heading'>UserId: </span> <span id='edit-modal-details'>{updateRole._id}</span></div>
                <div><span id='edit-modal-heading'>Email: </span> <span id='edit-modal-details'>{updateRole.email}</span></div>
                <span id='edit-modal-heading'>Role  : &nbsp;&nbsp;
                    <select id='edit-dropdown' value={selectedOption} onChange={handleSelectedChange} required>
                        <option >select</option>
                        <option value='admin' >admin</option>
                        <option value='user' >user</option>
                    </select></span>
                <div id='modal-buttons'>
                    <button onClick={()=>updateRoleHandle(updateRole._id,selectedOption)}>Update</button>
                    <button onClick={closeEditModalMethod} >Cancel</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>


         {/* modal to delete account */}
            <dialog id='delete-modal' className='delete-modal-class'>
                <h3>DELETE</h3>
                <hr id='line-horizontal-global'/>
                <h4> Are you sure to delete {deleteAccount.email} account?  </h4>
                <div id='modal-buttons'>
                    <button onClick={()=>deleteUserHandler(deleteAccount._id)}>Yes</button>
                    <button onClick={closeDeleteModalMethod} >No</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>USER ID</b></TableCell>
                                <TableCell ><b>EMAIL</b></TableCell>
                                <TableCell ><b>NAME</b></TableCell>
                                <TableCell align="left"><b>ROLE</b></TableCell>
                                <TableCell   ><b>ACTIONS</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((row,idx) =>
                                row.name.toLowerCase().includes(searchInput.toLowerCase().trim()) || 
                                  row.email.includes(searchInput.toLowerCase().trim()) ||
                                  row.role.toString().includes(searchInput.toLowerCase().trim()) ||
                                //    row.role+"s".toString().includes(searchInput.toLowerCase().trim()) ||
                                 row._id.toString().includes(searchInput.toLowerCase().trim()) ||
                                 searchInput.toLowerCase().trim() === 'all' ?
                            (
                                <TableRow  key={idx}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell component="th" scope="row">
                                        {row._id}
                                    </TableCell>
                                    <TableCell  >{row.email}</TableCell>
                                    <TableCell  >{row.name}</TableCell>
                                    <TableCell align="left">{row.role}</TableCell>
                                    <TableCell ><button id='edit-btn' onClick={() => openEditModalMethod(row)}>Edit</button>
                                     &nbsp; <button id='delete-btn' onClick={()=>openDeleteModalMethod(row)}>Delete</button></TableCell>
                                </TableRow>
                            ):<></>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AdminUsers
