import React, { useEffect, useState } from 'react'
import './LoginStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../navbar/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearUserErrors, loginUserMethod } from '../../actions/userActions'
import { useAlert } from 'react-alert'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { push as RouterPush } from 'react-router-redux';
const LoginComponent = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const handleButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [visible, setVisible] = useState(false);


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserMethod(userEmail, userPassword))
  }

  useEffect(() => {
    if (error) {
      if (error === 'Please login first') {
        // console.log("");
      }
      else
        alert.error(error);
      dispatch(clearUserErrors());
    }
    if (isAuthenticated) {
      navigate("/services")
    }
  }, [dispatch, error, alert, isAuthenticated])

  return (
    <div className='login-main'>
      <MetaData title="GharCare Login" />
      <form className='login-container' onSubmit={loginSubmit}>

        <h1>Login</h1>
        <div className='input-heading'>Enter your email</div>
        <input type='email' value={userEmail} name='email' placeholder='enter email' onChange={(e) => setUserEmail(e.target.value)} />

        <div className='input-heading'>Enter password</div>
        <div className='div-pass'>
          <input type={visible == true ? 'text' : 'password'} name='password' placeholder='enter password' onChange={(e) => setUserPassword(e.target.value)} />
          <span><sub className='login-password-icon'>{(visible === true) ? <VisibilityIcon id='login-password' onClick={() => setVisible(!visible)} />
            : <VisibilityOffIcon id='login-password' onClick={() => setVisible(!visible)} />}</sub></span></div>
          <span  className='forget-password'>  <Link to='/forget/password'>Forget password?</Link></span>
        <button type='submit' value="login" className='login-btn'>login</button>
      <div className='align-left-content'>  <Link className='signup-message' to='/signup'>Don't have account? Signup</Link></div>
      </form>
    </div>
  )
}

export default LoginComponent
