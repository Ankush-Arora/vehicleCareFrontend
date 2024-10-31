import React, { useEffect, useState } from 'react'
import './TeamCardStyles.css'

const TeamCardComponent = (props) => {

  const [member, setMember] = useState(props.memberProp);
  useEffect(() => {
    // console.log('Data is here', member.name);
    const controller=new AbortController();
    return ()=>{
        controller.abort();
    }
  })
  return (
    <div className='team-card-container'>
      <div className='team-card-img'> <img src={member.image} alt='img not found' /></div><hr className='horizontal-line' />
      <div> <b> {member.name} </b></div>
      <div>{member.description}</div>
    </div>
  )
}

export default TeamCardComponent
