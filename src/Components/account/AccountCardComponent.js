import React, { Fragment, useEffect, useState } from 'react'
import './AccountCardStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch } from 'react-redux';
import { logoutUserMethod, updateUserNameMethod } from '../../actions/userActions';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import '../styles/Styles.css'
import { useAlert } from 'react-alert';


const AccountCardComponent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertMessage=useAlert();
    const[newUserName,setNewUserName]=useState("");
   
    const openChangeUserNameModalMethod = () => {
        const modalElement = document.getElementById('change-userName-modal');
        modalElement.showModal();
    }

    const closeChangeUserNameModalMethod = () => {
        const element = document.getElementById('change-userName-modal');
        element.close();
    }

    const openDeleteLogoutModalMethod = () => {
        const modalElement = document.getElementById('delete-modal-logout');
        modalElement.showModal();
    }

    const closeDeleteLogoutModalMethod = () => {
        const element = document.getElementById('delete-modal-logout');
        element.close();
    }
    const loggingOut = () => {
        dispatch(logoutUserMethod());
        closeDeleteLogoutModalMethod();
        navigate('/');
    }

    const changeUserNameHandler=()=>{

        if(!newUserName || newUserName.trim() ==='')
        {
                alertMessage.error('Please enter valid username');
        }
        else{
        const newNameData={
            name:newUserName
        }
        if(newUserName.length>25)
        {
            alertMessage.error('Name does not exceed 25 characters');
            return;
        }
        dispatch(updateUserNameMethod(newNameData)); 
        alertMessage.success("Username updated!!");
        closeChangeUserNameModalMethod(); 
        setTimeout(()=>{
            window.location.reload();
        },1500)
         
    }
            //
    }

    return (
        props.isAuthenticated == false ? <Fragment> {navigate('/login')}</Fragment> :
            <div className='account-card-container'>
                <dialog id='delete-modal-logout' className='delete-modal-class'>
                    <h3>LOGOUT</h3>
                    <hr id='line-horizontal-global' />
                    <h4> Are you sure to logout this account?   </h4>
                    <div id='modal-buttons'>
                        <button onClick={loggingOut}>Yes</button>
                        <button onClick={closeDeleteLogoutModalMethod} >No</button>
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                </dialog>

                 {/* changing user name */}
                 <dialog id='change-userName-modal' className='delete-modal-class'>
                    <h3>UPDATE USERNAME</h3>
                    <hr id='line-horizontal-global' /><br></br>
                    <p>Enter new username</p>
                    <br></br>
                    <input type='text' placeholder='enter new username' onChange={(e)=>setNewUserName(e.target.value)}required /> <br></br> <br></br>
                    {/* <h4> Are you sure to change username?   </h4> */}
                    <div id='modal-buttons'>
                        <button onClick={changeUserNameHandler}>Update</button>
                        <button onClick={closeChangeUserNameModalMethod} >Cancel</button>
                        {/* <h4>you have selected {selectedOption}</h4> */}
                    </div>
                </dialog>
                <div className='account-card-img'>
                    <AccountBoxIcon id='account-user-icon' />
                </div>
                <hr className='horizontal-line-account' />
                <div id={(props.userInfo.name.length > 18) ?'overflow-large-heading-account':''}> <b> {(props.isAuthenticated === true && props.userInfo.name) ? props.userInfo.name : 'Name'}</b>
                    <sub>  {(props.isAuthenticated === true && props.userInfo.role === 'user') ? <PersonIcon id='user-account-icon' /> : <VerifiedIcon id='admin-account-icon' />} </sub></div>
                <hr className='horizontal-line-account' />
                <div id={(props.userInfo.email.length) >20 ? 'overflow-large-heading-account': ''}><b>{(props.isAuthenticated === true) ? props.userInfo.email : 'Email'}</b></div>
                <hr className='horizontal-line-account' />
                {
                    props.isAuthenticated === true ? <>
                        <div id='account-profile-links'>
                            <Link onClick={openChangeUserNameModalMethod}>Update username</Link>
                        </div>
                        <hr className='horizontal-line-account' />
                        <div  id='account-profile-links' >
                            <Link to='/booked/services'> Booked Services </Link>
                        </div>
                        <hr className='horizontal-line-account' />
                        <div  id='account-profile-links' >
                            <Link to='/change/password'> Change password</Link>
                        </div>
                        <hr className='horizontal-line-account' />
                        <div className='account-btn' id='account-profile-links' >
                            <Link onClick={openDeleteLogoutModalMethod}>Logout</Link>
                        </div> <hr className='horizontal-line-account' />   </> : <></>
                }
            </div>
    )
}

export default AccountCardComponent
