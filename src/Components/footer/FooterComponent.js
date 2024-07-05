import React from 'react'
import './FooterStyles.css'
import { Link } from 'react-router-dom'
import '../styles/Styles.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import EmailIcon from '@mui/icons-material/Email';
const FooterComponent = () => {

    const handleButton = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }

    const openModalMethod = () => {
        const modalElement = document.getElementById('modal');
        modalElement.showModal();
    }

    const closeModalMethod = () => {
        const element = document.getElementById('modal');
        element.close();
    }
    return (
        <div className='footer'>
            <dialog id='modal' className='modal-container'>
                <h1>Read More details</h1>
                <h4>Will add some details soon...</h4>
                <button onClick={closeModalMethod} className='modal-btn'>Close</button>
            </dialog>
            <div className='footer-left'>
                <h4 className='testing'>COMPANY</h4>
                <div id='footer-left-heading'> <sub>   <LocalCarWashIcon/></sub>&nbsp;<span>वाहनCARE</span></div>
                <div id='footer-left-heading'><Link className='company-links'><span>Privacy Policy</span></Link></div>
                <div id='footer-left-heading'><Link className='company-links'><span>Terms and Conditions</span></Link></div>
                <div id='footer-left-heading'><Link className='company-links'><span>Help</span></Link></div>
            </div>
            <div className='footer-middle'>
                <h4>NEED HELP</h4>
                <div ><span>call us directly</span></div>
                <div><sub className='phone-icon'><PhoneIcon /></sub>: &nbsp;&nbsp;<span className='footer-mobile'>9876543210</span></div>
                <div><sub className='phone-icon'><EmailIcon /></sub>: &nbsp;&nbsp;<span className='footer-mobile'>Mail us</span></div>
                <div><Link className='footer-mail'>vahanCare@gmail.com</Link></div>
            </div>
            <div className='footer-right'>
                <h4>FOLLOW US!</h4>
                <div>
                    <span><Link to={`mailto:${"ankusharora5551@gmail.com"}`}><EmailIcon id='social-media-icon' /></Link></span>
                    <span> <Link to='https://www.instagram.com/ankush_arora_.19/'><InstagramIcon id='social-media-icon' /></Link></span>
                    <span><Link to='https://twitter.com/ankusharora5551?t=rcdU3YL9U3xo2dgITkKKrA&s=08'><TwitterIcon id='social-media-icon' /></Link></span>
                    <span> <Link to='https://www.linkedin.com/in/ankush-arora-b28b151ab/'><LinkedInIcon id='social-media-icon' /></Link></span>
                </div>
                <div><button className='site-btn'><Link className='link-data-modify' to='/aboutus' onClick={handleButton}>About Us</Link></button></div>
                <div id='read-more'><Link  onClick={openModalMethod}>Read More...</Link></div>
                <div className='copy-right-heading'> &copy; Copyright 2024  <span>All rights reserved.</span></div>
            </div>
        </div>
    )
}

export default FooterComponent
