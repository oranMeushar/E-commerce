import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as cartActions from '../store/actions/cart';
import * as api from '../util/api';
import {Redirect} from 'react-router-dom';

const Logout = (props) => {

    useEffect(() =>{
        (async()=>{
            localStorage.removeItem('cart');
            const endpoint = 'auth/signout';
            await api.get(endpoint);
            props.onLogout();
            props.resetCart();
        })()
        
        // eslint-disable-next-line
    },[]);

    return(
        <Redirect to='/'/>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLogout:() => dispatch(authActions.onLogout()),
        resetCart:()=>dispatch(cartActions.handleResetCart())
    }
}



export default connect(null, mapDispatchToProps)(Logout);