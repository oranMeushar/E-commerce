import React, {useState, useEffect, useRef} from 'react';
import './Signup.css';
import SignupImg from '../assets/signup.jpg';
import userImg from '../assets/user.png';
import padLockImg from '../assets/padlock.png';
import emailImg from '../assets/email.png';
import * as api from '../util/api';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';
import {setLocalWithExpire} from '../util/localStorage';
import Loader from '../Loader/Loader';

const Signup = (props) => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    const [name, setName] = useState({
        value:'',
        activeError:''
    });
    const [email, setEmail] = useState({
        value:'',
        activeError:''
    });
    const [password, setPassword] = useState({
        value:'',
        activeError:''
    });
    const [passwordConfirm, setPasswordConfirm] = useState({
        value:'',
        activeError:''
    });
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    const loader = () =>{
        if (isLoading) {
            return(
                <Loader/>
            )
        }
    }

    const handleFailureResponse = (data) =>{
        setIsLoading(false)
        if (data.errors) {
            for (const key in data.errors) {
                switch (key) { 
                    case 'name':
                        setName({value:data.errors[key].message, activeError:'activeError'});
                        break;
                    case 'email':
                        setEmail({value:data.errors[key].message, activeError:'activeError'});
                        break;
                    case 'password':
                        setPassword({value:'', activeError:'activeError'});
                        break;
                    case 'passwordConfirm':
                        setPasswordConfirm({value:'', activeError:'activeError'});
                        break;
                    default:
                        break;
                }
            }
        }
        if (data.message.includes('E11000')) {
            setEmail({value:'Email already exists', activeError:'activeError'});
        }
    }

    const handleSuccesResponse = (data) => {
        setIsLoading(false)
        props.onSuccess(data.data.token, data.user);
        setLocalWithExpire()
        props.history.push('/');
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let endPoint = 'auth/signup';
        const content = {
            name:name.value,
            email:email.value,
            password:password.value,
            passwordConfirm:passwordConfirm.value
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

    return (
        <>
        {loader()}
        <div className="Signup">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <div className="Signup-form-image-wrapper">
                    <img src={SignupImg} alt="SignupImg"/>
                </div>
                <div className="Signup-form-content">
                    <h1>Sign Up</h1>
                    <h3>Sign up and enjoy our products with the lowest prices on the market</h3>
                    <label htmlFor="name" className="Signup-form-input-wrapper">
                        <input 
                            type="text" 
                            ref = {nameRef}
                            id="name"
                            placeholder="&nbsp;"
                            name="name" 
                            value={name.value}
                            onChange={(e)=>setName({...name, value:e.target.value})}
                            onFocus={(e)=>{
                                setName({...name, activeError:'' });
                                nameRef.current.select();
                            }}
                            className={name.activeError}/>
                        <span className="Signup-placeholder">UserName</span>
                        <img src={userImg} alt="userImg"/>
                    </label>
                    <label htmlFor="email" className="Signup-form-input-wrapper">
                        <input 
                            type="email" 
                            ref = {emailRef}
                            id="email"
                            placeholder="&nbsp;"
                            name="email" 
                            value={email.value}
                            onChange={(e)=>setEmail({...email, value:e.target.value})}
                            onFocus={(e)=>{
                                setEmail({...email, activeError:'' })
                                emailRef.current.select();
                            }}
                            className={email.activeError}/>
                        <span className="Signup-placeholder">Email</span>
                        <img src={emailImg} alt="emailImg"/>
                    </label>
                    <label htmlFor="password" className="Signup-form-input-wrapper">
                        <input 
                            type="password" 
                            ref = {passwordRef}
                            id="password"
                            placeholder="&nbsp;"
                            name="password" 
                            value={password.value}
                            onChange={(e)=>setPassword({...password, value:e.target.value})}
                            onFocus={(e)=>{
                                setPassword({...password, activeError:'' });
                                passwordRef.current.select();
                            }}
                            className={password.activeError}/>
                        <span className="Signup-placeholder">Password</span>
                        <span className="Signup-form-input-minLength">*min 6 length</span>
                        <img src={padLockImg} alt="padLockImg"/>
                    </label>
                    <label htmlFor="passwordConfirm" className="Signup-form-input-wrapper">
                        <input 
                            type="password" 
                            ref = {confirmRef}
                            id="passwordConfirm"
                            placeholder="&nbsp;"
                            name="passwordConfirm" 
                            value={passwordConfirm.value}
                            onChange={(e)=>setPasswordConfirm({...passwordConfirm, value:e.target.value})}
                            onFocus={(e)=>{
                                setPasswordConfirm({...passwordConfirm, activeError:'' });
                                confirmRef.current.select();
                            }}
                            className={passwordConfirm.activeError}/>
                        <span className="Signup-placeholder">Confirm password</span>
                        <img src={padLockImg} alt="padLockImg"/>
                    </label>
                    <button type="submit" className="Signup-form-submit">Sign Up Now</button>
                </div>
            </form>
        </div>
        </>
        
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token, user) =>dispatch(actions.onSuccessAuth(token, user))
    }
}

export default connect(null, mapDispatchToProps)(Signup);
