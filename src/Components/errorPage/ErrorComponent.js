import React from 'react'
import './ErrorStyles.css'
import { Link } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
const ErrorComponent = () => {
  return (
    <div className='page-not-found-container'>
        <div> <h3> 404 Error <sub> <ErrorIcon id='error-icon'/></sub></h3> </div>
        <div>Page not found</div>
       <Link to='/'> <button className='error-btn'><p>Go to home</p> </button></Link>
    </div>
  )
}

export default ErrorComponent
