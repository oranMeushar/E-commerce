import React,{useState, useRef, useEffect} from 'react'
import './NewPassword.css';
import padLockImg from '../assets/padlock.png';
import * as api from '../util/api';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';

const NewPassword = (props) => {
    const[oldPassword, setOldPassword] = useState('');
    const[password, setPassword] = useState('');
    const[passwordConfirm, setPasswordConfirm] = useState('');
    const[errorResponse, setErrorResponse] = useState(null);
    
    const [cssClasses, setCssClasses] =useState('NewPassword-form');
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        if (!props.isModal.value) {
            setOldPassword('');
            setPassword('');
            setPasswordConfirm('');
            setCssClasses('NewPassword-form');
        }
        else{
            setCssClasses('NewPassword-form active');
        }
        // eslint-disable-next-line
    },[props.isModal.value]);

    const handleFailureResponse = (data) =>{
        if (data.errors) {
            setErrorResponse(data.message.split(':')[0]);
        }
        else{
            setErrorResponse(data.message)
        }
        setTimeout(() => {
            setErrorResponse(null);
        }, 3000);

    }

    const handleSuccesResponse = (data) => {
        props.onSuccess(data.data.token, data.user);
        props.setResponse(data.message);
        props.setisModal({
            ...props.isModal,
            value:false,
        })
        setTimeout(() => {
            props.setResponse(null);
        }, 3000);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let endPoint = 'users/password';
        const content = {
            oldPassword,
            newPassword:password,
            newPasswordConfirm:passwordConfirm
        }
        const [result, data] = await api.patch(endPoint, content);
        if (result.status === 200) {
            handleSuccesResponse(data)
        }
        else{
            handleFailureResponse(data)
        }
    }

    let message = errorResponse?
        (<h1 className={`response-red`}>{errorResponse}</h1>)
        :null
    return (
        <div className="NewPassword">
            {message}
            <form className={cssClasses} onSubmit={handleSubmit}>
                <h1>Change Password</h1>
                <label htmlFor="oldPassword" className="NewPassword-form-input-wrapper">
                    <input 
                        type="password" 
                        ref = {inputRef}
                        id="oldPassword"
                        placeholder="&nbsp;"
                        name="oldPassword" 
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}/>
                    <span className="NewPassword-placeholder">Old Password</span>
                    <img src={padLockImg} alt="padLockImg"/>
                </label>
                <label htmlFor="newPassword" className="NewPassword-form-input-wrapper">
                    <input 
                        type="password" 
                        id="newPassword"
                        placeholder="&nbsp;"
                        name="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <span className="NewPassword-placeholder">New Password</span>
                    <img src={padLockImg} alt="padLockImg"/>
                    <span className="NewPassword-form-input-minLength">*min 6 length</span>
                </label>
                <label htmlFor="newPasswordConfirm" className="NewPassword-form-input-wrapper">
                    <input 
                        type="password" 
                        id="newPasswordConfirm"
                        placeholder="&nbsp;"
                        name="passwordConfirm" 
                        value={passwordConfirm}
                        onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                    <span className="NewPassword-placeholder">Confirm Password</span>
                    <img src={padLockImg} alt="padLockImg"/>
                </label>
                <button type="submit" className="NewPassword-form-submit">Change Password</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token, user)=>dispatch(actions.onSuccessAuth(token, user))
    }
}

export default connect(null, mapDispatchToProps)(NewPassword);
