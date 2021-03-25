import React from 'react';
import './Logo.css';
import {Link} from 'react-router-dom';
import LogoImg from '../assets/logo.png';


const Logo = () => {
    return (
        <div className="Logo">
            <Link to='/'><img src={LogoImg} alt="logo"/></Link>
        </div>
    )
}

export default Logo;
