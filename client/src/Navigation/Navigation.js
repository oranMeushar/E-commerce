import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import logoutImg from '../assets/logout.ico';
const Navigation = (props) => {
    return (
        <div className="Navigation">
            <nav className="Navigation-nav">
                <Logo/>
                <ul>
                    <li>
                            <NavLink exact to='/'>Home</NavLink>
                    </li>
                    {
                        props.token?null:
                        <li>
                            <NavLink exact to='/login'>Login</NavLink>
                        </li>
                    }
                    {
                        props.token?null:
                        <li>
                            <NavLink exact to='/signup'>Sign Up</NavLink>
                        </li>
                    }
                    
                    {
                        props.token && props.user.role !== 'admin'?
                        <li><NavLink exact to='/cart'>Cart<sup>{props.cart.totalItems}</sup></NavLink></li>:null
                    }
                    {
                        props.token && props.user.role !== 'admin'?
                        <li><NavLink exact to='/orders'>Orders</NavLink></li>:null
                    }
                    {
                        props.token?
                        <li>
                            <NavLink 
                                exact 
                                to={props.user.role==='admin'?'/admin/dashboard':'/user/dashboard'}
                                >Dashboard
                            </NavLink>
                        </li>:null
                        
                    }
                    {
                        props.token?
                        <li className="logout-img">
                            <NavLink to='/logout'><img src={logoutImg} alt="logoutimg"/></NavLink>
                        </li>:null
                    }

                    
                </ul>
            </nav>
        </div>
    )
}


const mapStateToProps = (state) =>{
    return{
        token:state.auth.token,
        user:state.auth.user,
        cart:state.cart
    }
    
}
export default connect(mapStateToProps)(Navigation);
