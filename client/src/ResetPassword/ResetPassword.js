import React, {useState} from 'react';
import './ResetPassword.css';
import padlock from '../assets/padlock.png';
import * as api from '../util/api';
import {connect} from 'react-redux';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const[errorResponse, setErrorResponse] = useState(null);


    const handleSuccessResponse = ()=>{
        props.history.push('/login');    
    }

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

    const handleSubmit = async(e)=>{
        e.preventDefault();  
        const endPoint = `auth/resetPassword/${props.match.params.resetToken}`;
        const stateObj = {
            password:password,
            passwordConfirm:passwordConfirm
        };
        const [result, data] = await api.post(endPoint, stateObj);
        if (result.status === 200) {
            handleSuccessResponse();
        }
        else{
            handleFailureResponse(data);
        }
    }

    let message = errorResponse?
    (<h1 className={`response-red`}>{errorResponse}</h1>)
    :null
    return(
        <form className="ResetPassword" onSubmit={handleSubmit}>
            {message}
            <div className="ResetPassword-wrapper">
                    <h1>Reset password</h1>
                    <label htmlFor ="password"className="ResetPassword-input-wrapper">
                        <input 
                        value = {password} 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder= "&nbsp;" 
                        onChange={(e)=>setPassword(e.target.value)}
                        className={password.activeError}/>
                        <span className="ResetPassword-placeholder">Password</span>
                        <span className="ResetPassword-password-min-length">*6 length min</span>
                        <img src={padlock} alt="padlock"/>
                    </label>
                    <label htmlFor ="passwordConfirom"className="ResetPassword-input-wrapper">
                        <input 
                        value={passwordConfirm} 
                        type="password" 
                        id="passwordConfirom"  
                        name="passwordConfirom" 
                        placeholder="&nbsp;"
                        onChange={(e)=>setPasswordConfirm(e.target.value)}
                        className={passwordConfirm.activeError}/>
                        <span className="ResetPassword-placeholder">Confirm Password</span>
                        <img src={padlock} alt="padlock"/>
                    </label>
                    <button className='ResetPassword-submit' type="submit">Reset Password</button>
                </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) =>{
    /* return{
        onSuccess:(token) =>dispatch(actions.onSuccess(token))
    } */
}

export default connect(null, mapDispatchToProps)(ResetPassword);