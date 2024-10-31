import React from 'react'
import './AgentVerificationStyles.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const AgentVerificationComponent = () => {
  return (
    <div className='verification-main'>
      <div className='first-section'>
        <p>Delightful Assurance <SentimentSatisfiedAltIcon className='emoji-icon' /></p>
        <span>If you’re not satisfied, we’ll work to make it right.</span>
      </div>
      <div className='second-section'>
        <p>Verified Agents<VerifiedIcon className='blue-tick' /></p>
        <span>Agents are always background checked before joining the platform.</span>
      </div>
      <div className='third-section'>
        <p>Service Timings<AccessTimeIcon className='time-icon' /></p>
        <span>Our agent visiting time starts at 8:00 am and end at 8:00 pm (IST) </span>
      </div>
      <div className='third-section'>
        <p>Proactive Support <SupportAgentIcon className='agent-support' /></p>
        <span>Friendly service when you need us – every day of the week.</span>
      </div>

    </div>
  )
}

export default AgentVerificationComponent
