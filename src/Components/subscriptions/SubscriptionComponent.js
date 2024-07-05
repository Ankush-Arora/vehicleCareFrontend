import React from 'react'
import './SubscriptionStyles.css'
import { useAlert } from 'react-alert'

const SubscriptionComponent = () => {

  const alertMsg=useAlert();

  return (
    <div className='subs-container'>
      <div className='one-month-sub'>
        <div id='price-heading'>₹599</div>
        <div id='month-heading'>One Month</div>
        <div id='join-button'><button onClick={()=>alertMsg.success("We will add monthly subscription soon!")}>Join</button></div>
        <div id='subs-description'>This is prepaid monthly subscription in which our
         agent washes your vehicle with water four times in a month.</div>
      </div>
      <div className='three-month-sub'>
        <div id='price-heading'>₹1499</div>
        <div id='month-heading'>Three Months</div>
        <div id='join-button'><button onClick={()=>alertMsg.success("We will add monthly subscription soon!")}>Join</button></div>
        <div id='subs-description'>This is prepaid three months subscription in which our
         agent washes your vehicle with water four times in a month & two times clean your vehicle by scratchless cloth.</div>
      </div>
      <div className='six-month-sub'>
      <div id='price-heading'>₹2899</div>
        <div id='month-heading'>Six Months</div>
        <div id='join-button'><button onClick={()=>alertMsg.success("We will add monthly subscription soon!")}>Join</button></div>
        <div id='subs-description'>This is prepaid six months subscription in which our
         agent washes your vehicle with water four times in a month & two times clean your vehicle by scratchless cloth.</div>
      </div>
      <div className='twelve-month-sub'>
      <div id='price-heading'>₹5499</div>
        <div id='month-heading'>Twelve Months</div>
        <div id='join-button'><button onClick={()=>alertMsg.success("We will add monthly subscription soon!")}>Join</button></div>
        <div id='subs-description'>This is prepaid twelve months subscription in which our
         agent washes your vehicle with water four times in a month & four times clean your vehicle by scratchless cloth.</div>
      </div>
    </div>
  )
}

export default SubscriptionComponent
