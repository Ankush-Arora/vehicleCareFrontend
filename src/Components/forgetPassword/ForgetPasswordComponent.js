import React, { useEffect, useState } from 'react'
import MetaData from '../navbar/MetaData'
import './ForgetPasswordStyles.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearUserErrors, forgotPasswordMethod } from '../../actions/userActions'
import { useNavigate } from 'react-router'
const ForgetPasswordComponent = () => {

  const dispatch=useDispatch();
  const {error,loading,message}=useSelector((state)=>state.forgotPassword);
  const alertMsg=useAlert();
  const [email,setEmail]=useState("");
  const navigate=useNavigate();

  const forgotPasswordSubmitHandler=(e)=>{
    e.preventDefault();

    const myForm=new FormData();
    myForm.set("email",email);
    dispatch(forgotPasswordMethod(myForm));
    const signupelement=document.getElementById('login-container-display');
      signupelement.style.display='none'
    // setEmail("");
  }

  useEffect(()=>{
    const controller=new AbortController();
    if(error)
    {
      alertMsg.error(error);
      dispatch(clearUserErrors());
    }
    if(message)
    {
      alertMsg.success(message);
     setTimeout(() => {
      navigate('/');
     }, 1500);
    }
    return ()=>{
      controller.abort();
    }
  },[dispatch,message,error])

  return (
    <div className='forget-password-main'>
       <div className='login-main'>
      <MetaData title="forget pasword" />
      <form className='login-container1' id='login-container-display' onSubmit={forgotPasswordSubmitHandler}  >
        <h1 id='heading-size'>Forget Password</h1>
        <hr id='forget-password-hor-line' />
        <div className='align-left-email'> <span><b>Enter your email</b></span></div>
        
        <input type='email'   name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter email'  required /> 
        <div><button type='submit' id='send-btn-email' value="login"  >Send email</button></div>
      </form>
    </div>
    </div>
  )
}

export default ForgetPasswordComponent
