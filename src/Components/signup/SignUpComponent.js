import React, { useEffect, useState } from 'react'
import './SignupStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../navbar/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { clearUserErrors, registerUserMethod } from '../../actions/userActions'
import { useAlert } from 'react-alert'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SignUpComponent = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [visible, setVisible] = useState(false);

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const signupSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserMethod(credentials.name, credentials.email, credentials.password));
  }


  useEffect(() => {
    const controller=new AbortController();
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
    // console.log("user in signup = ",user);
    return ()=>{
      controller.abort();
    }
  }, [dispatch, error, alert, isAuthenticated])


  return (
    <div className='signup-main'>
      <MetaData title="SignUp Page" />
      <form className='signup-container' onSubmit={signupSubmit} >
        <h1>Signup</h1>
        <div className='input-heading'>Enter name  </div>
        <input type='text' placeholder='enter username' name='name' value={credentials.name} onChange={onChange} required />
        <div className='input-heading'>Enter your email  </div>
        <input type='email' placeholder='enter email' value={credentials.email} name='email' onChange={onChange} required />
        <div className='input-heading'>Enter password  </div>
        <div id='sign-up-password'>
          <input type={visible == true ? 'text' : 'password'} placeholder='enter password' name='password' value={credentials.password} onChange={onChange} required />
           <span id='sign-up-password-span'><sub> {(visible === true) ?<sub> <VisibilityIcon onClick={() => setVisible(!visible)} /></sub> : <sub><VisibilityOffIcon onClick={() => setVisible(!visible)} /></sub>}</sub></span> 
        </div>
        <button type='submit' className='signup-btn' >signup</button>
       <div className='align-left-content'> <Link className='signup-message' value='signup' to='/login'>Already have account? Login</Link></div>
      </form>
    </div>
  )
}

export default SignUpComponent
