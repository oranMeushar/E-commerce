import React, {useState, useEffect, useRef} from 'react';
import './Login.css';
import loginImg from '../assets/login.jpg';
import padLockImg from '../assets/padlock.png';
import emailImg from '../assets/email.png';
import * as api from '../util/api';
import * as actions from '../store/actions/auth';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLocalWithExpire} from '../util/localStorage';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

const Login = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const [isModal, setisModal] = useState({
        value:false,
        currentChild:''
    });

    useEffect(() => {
        let query = new URLSearchParams(window.location.search);
        let auth = query.get('auth');
        if (auth === 'false') {
            setisModal({
                ...isModal,
                value:true
            })
        }
        emailRef.current.focus();
        // eslint-disable-next-line
    }, []);

    const handleFailureResponse = (data) =>{
        setIsLoading(false)
        setError(data.message);
        setTimeout(() => {
            setError(null)
        }, 4000);
    }

    const handleSuccesResponse = (data) => {
        setIsLoading(false)
        props.onSuccess(data.data.token, data.user);
        setLocalWithExpire();
        props.history.push('/');
    }

    const modal = () =>{
        if (isModal.value) {
            return(
                <Modal isModal = {isModal} setisModal = {setisModal}>
                    <h1 className="error-login">Please login in order to add items to cart</h1> 
                </Modal>
            )
        }
    }

    const loader = () =>{
        if (isLoading) {
            return(
                <Loader/>
            )
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let endPoint = 'auth/login';
        const content = {
            email:email,
            password:password,
        }
        setIsLoading(true)
        const [result, data] = await api.post(endPoint, content);
        if (result.status === 200) {
            handleSuccesResponse(data)
        }
        else{
            handleFailureResponse(data)
        }
    }

    let errorMessage = null;
    if (error) {
        errorMessage = (<h1 className="error-message">{error}</h1>)
    }

    return (
        <div className="Login">
            {errorMessage}
            {modal()}
            {loader()}
            <form className="Login-form" onSubmit={handleSubmit}>
                <div className="Login-form-image-wrapper">
                    <img src={loginImg} alt="loginImg"/>
                </div>
                <div className="Login-form-content">
                    <h1>Welcome</h1>
                    <label htmlFor="email" className="Login-form-input-wrapper">
                        <input 
                            type="email" 
                            ref = {emailRef}
                            id="email"
                            placeholder="&nbsp;"
                            name="email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            onFocus={(e)=>emailRef.current.select()}/>
                        <span>Email</span>
                        <img src={emailImg} alt="emailImg"/>
                    </label>
                    <label htmlFor="password" className="Login-form-input-wrapper">
                        <input 
                            type="password" 
                            ref = {passwordRef}
                            id="password"
                            placeholder="&nbsp;"
                            name="password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            onFocus={(e)=>passwordRef.current.select()}/>
                        <span>Password</span>
                        <img src={padLockImg} alt="padLockImg"/>
                    </label>
                    <button type="submit" className="Login-form-submit">Login</button>
                    <Link to="/forgotPassword">Forgot Password?</Link>
                </div>
            </form>
            

        </div>
        
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token, user) =>dispatch(actions.onSuccessAuth(token, user))
    }
}

export default connect(null, mapDispatchToProps)(Login);
