import React from 'react';
import './Layout.css';
import Navigation from '../Navigation/Navigation';
const Layout = (props) => {
    return (
        <div className="Layout">
            <Navigation/>
            {props.children}
        </div>
    )
}

export default Layout;
