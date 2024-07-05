import React, { Fragment } from 'react'
import './AccountStyles.css'
import AccountCardComponent from './AccountCardComponent'
import MetaData from '../navbar/MetaData'
import { useDispatch, useSelector } from 'react-redux'
// import Loading from '../loading/Loading'
import ErrorComponent from '../errorPage/ErrorComponent'
import Loading from '../loading/Loading'
const AccountComponent = () => {

  const {loading, isAuthenticated, user } = useSelector((state) => state.user);
    // const dispatch = useDispatch();
  
  return (
    (!isAuthenticated)?<Loading/>:
    <>
     <div className='component-heading'><h1>Account</h1></div>
     <MetaData title="Account Page"/>
    <div className='account-container'>
     <AccountCardComponent userInfo={user} isAuthenticated={isAuthenticated}/>
      
    </div>
    </>
  )
}

export default AccountComponent
