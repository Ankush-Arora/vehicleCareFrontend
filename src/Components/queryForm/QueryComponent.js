import React, { useEffect, useState } from 'react'
import './QueryStyles.css'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import axios from 'axios';
import { useAlert } from 'react-alert';
const QueryComponent = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const alert=useAlert();

  const querySubmitHandler = async (e) => {
    e.preventDefault();
    const querydata = {
      "name": name,
      "email": email,
      "phoneNumber": phoneNumber,
      "message": message
    }
    try{
    const config = { headers: { "Content-Type": "application/json" } }
    const {data}  = await axios.post(`/api/v1/send/query`, querydata, config);
    // console.log(data);
      if(data.success==true)
      {
        alert.success("Message sent we will response soon!");
        setEmail("");
        setName("");
        setPhoneNumber("");
        setMessage("");
      }
      else if(data.success==false)
      {
        alert.error(data.message);
      }
    }
    catch(error)
    {
      console.error(error.response.data);
    }
  }
   
  return (
    <div className='query-container'>
      <div className='query-title'>
        {/* <SupportAgentIcon className='query-support-icon' /> */}
        <div className='query-support-icon'> <img src='images/support.jpg' alt='image-not found' height="200px" width="200px"   /></div>
       
         <p>Message us:</p> </div>

      <form className='query-form' onSubmit={querySubmitHandler}>
        <input type='text' placeholder='Name' value={name}   onChange={(e)=>setName(e.target.value)} required />
        <input type='email' placeholder='email'  value={email}  onChange={(e)=>setEmail(e.target.value)} required />
        <input type='number' placeholder='phone' value={phoneNumber}  onChange={(e)=>setPhoneNumber(e.target.value)} required />
        <textarea placeholder='query or message' value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
        <button type='submit' >Send</button>
      </form>

    </div>
  )
}

export default QueryComponent
