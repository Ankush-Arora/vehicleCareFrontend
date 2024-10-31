import React, { useEffect, useState } from 'react'
import '../styles/Styles.css'
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import '../navbar/NavbarStyles.css'
import { useSelector, useDispatch } from 'react-redux';
import { loadUserMethod } from '../../actions/userActions';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';

const NavbarComponent = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [token, setToken] = useState(false);
  const [role, setRole] = useState('user');
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const changeMenu = () => {
    setShowMenu(!showMenu)
    setShowSlider(!showSlider)
  }

  const { user } = useSelector((state) => state.user);

  const changeToTopOfThePage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }



  useEffect(() => {
    const controller=new AbortController();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    dispatch(loadUserMethod());
    // console.log('User in navbar', user);
    return ()=>{
      controller.abort();
    }
  }, [])

  const changeLoginBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowLogin(!showLogin);
  }

  return (
    <div className='nav-container'>
      <nav className='navbar-main'>

        <Link to='/' className='nav-icon-name'>
          <div>
            {/* <img src='/images/logoGhar.jpeg' alt='logo image not found' /> */}
            <LocalCarWashIcon id='car-icon' /> &nbsp;&nbsp;
            <div id='site-name-heading'>
            <span id='site-name'><b>वाहनCARE </b></span>
            <span id='tag-line-heading'>We care for your vehicle </span> 
            </div>
          </div>
        </Link>
        <div>
          <ul className={showSlider === false ? 'navbar-list' : ' navbar-list-slider'}  > <hr className='horizontal-line' />
            <li> <Link className='active' to='/'>Home</Link>  </li><hr className='horizontal-line' />
            <li><Link to='/services' >Services</Link></li><hr className='horizontal-line' />
            {/* <li><Link to='/contact' >Contact</Link></li><hr className='horizontal-line'/> */}
            {
              (!(user === null)) ? <></> :
                (showLogin == true) ? <> <li> <Link to='/login' onClick={changeLoginBtn} >Login</Link></li><hr className='horizontal-line' /> </> :
                  <>  <li> <Link to='/signup' onClick={changeLoginBtn}>Signup</Link></li> <hr className='horizontal-line' /> </>}
            {
              (user) && user.role === 'admin' ? <> <li><Link to='/admin/dashboard' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} >Dashboard</Link></li><hr className='horizontal-line' /> </> : <></>
            }
            {(user) ? <> <div className='profile-icon'><Link to='/account' onClick={changeToTopOfThePage}><AccountCircleIcon className='profile-icon-logo' /><span>Account</span></Link>  </div> <hr className='horizontal-line' /> </> : <></>}
          </ul>
        </div>

        <div className='mobile-view'>
          {
            showMenu === true ? <Link onClick={changeMenu}><MenuIcon /></Link> :
              <Link onClick={changeMenu}><CloseIcon /></Link>
          }
        </div>

      </nav>
    </div>
  )
}

export default NavbarComponent
