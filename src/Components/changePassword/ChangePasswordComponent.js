import React, { useEffect, useState } from 'react'
import './ChangePasswordStyles.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';
import { CHANGE_USER_PASSWORD_RESET, CLEAR_ERRORS } from '../../constants/userConstants';
import { changeUserPasswordMethod } from '../../actions/userActions';
const ChangePasswordComponent = () => {

    const [visibilityOld, setVisibilityOld] = useState(false);
    const [visibilityNew, setVisibilityNew] = useState(false);
    const [visibilityConfirm, setVisibilityConfirm] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { message,error, isUpdated } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        const controller=new AbortController();
        if (isUpdated) {
            alert.success("Password changed successfully!");
            dispatch({ type: CHANGE_USER_PASSWORD_RESET });
            navigate('/account');
        }
        if(error)
        {
            if(error==='Please login first')
            {
                alert.error('session time out login again');
                navigate('/login');
            }
            else
            alert.error(error);
            dispatch({type:CLEAR_ERRORS})
        }
        if (message) {
            alert.error(message);
        }
        return ()=>{
            controller.abort();
        }
    }, [dispatch, message,error, isUpdated])

    const openChangePasswordModalMethod = () => {
        const modalElement = document.getElementById('change-password-modal');
        modalElement.showModal();
    }

    const changePasswordHandler = (e) => {
        e.preventDefault();
        openChangePasswordModalMethod();
    }

    const closeDeleteQueryModalMethod = () => {
        const element = document.getElementById('change-password-modal');
        element.close();
    }

    const passwordChange = () => {
        const passwords = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        }
        dispatch(changeUserPasswordMethod(passwords));
        closeDeleteQueryModalMethod();
    }

    return (
        <div className='change-password-top'>
            <div className='component-heading'><h1>Change Password</h1></div>

            <dialog id='change-password-modal' className='delete-modal-class'>
                <h3>DELETE</h3>
                <hr id='line-horizontal-global' />
                <h4> Are you sure to change password? </h4>
                <div id='modal-buttons'>
                    <button onClick={passwordChange} >Yes</button>
                    <button onClick={closeDeleteQueryModalMethod} >No</button>
                    {/* <h4>you have selected {selectedOption}</h4> */}
                </div>
            </dialog>

            <form className='password-inputs' onSubmit={changePasswordHandler}>
                {/* <form> */}
                <div>Old Password</div>
                <input type={visibilityOld === true ? 'text' : 'password'} placeholder='old password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                <sub> {visibilityOld === true ? <VisibilityIcon id='old-password' className='toggle-password' onClick={() => setVisibilityOld(!visibilityOld)} /> :
                    <VisibilityOffIcon id='old-password' className='toggle-password' onClick={() => setVisibilityOld(!visibilityOld)} />}</sub>{visibilityOld}

                <div>New Password</div>
                <input type={visibilityNew === true ? 'text' : 'password'} placeholder='new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <sub> {visibilityNew === true ? <VisibilityIcon id='new-password' className='toggle-password' onClick={() => setVisibilityNew(!visibilityNew)} /> :
                    <VisibilityOffIcon id='new-password' className='toggle-password' onClick={() => setVisibilityNew(!visibilityNew)} />}</sub>

                <div>Confirm new password</div>
                <input type={visibilityConfirm === true ? 'text' : 'password'} placeholder='confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <sub> {visibilityConfirm === true ? <VisibilityIcon id='confirm-password' className='toggle-password' onClick={() => setVisibilityConfirm(!visibilityConfirm)} /> :
                    <VisibilityOffIcon id='confirm-password' className='toggle-password' onClick={() => setVisibilityConfirm(!visibilityConfirm)} />}</sub>
                <div>
                    <button id='change-password-btn' type='submit'>Change Password</button>
                </div>
            </form>

        </div>
    )
}

export default ChangePasswordComponent
