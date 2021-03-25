import React, {useState} from 'react';
import './ForgotPassword.css';
import emailImg from '../assets/email.png';
import * as api from '../util/api';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({
        data:null,
        color:'',
    });



    const handleResponse = (data, color)=>{
        setMessage({
            data:data.message,
            color
        })

        setTimeout(() => {
            setMessage({
                data:null,
                color:''
            })
        }, 3000);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();  
        const endPoint = 'auth/forgotPassword';
        const [result, data] = await api.post(endPoint, {email});
        if (result.status === 200) {
            handleResponse(data, 'green');
        }
        else{
            handleResponse(data, 'red');
        }
    }


    return(
        <div className="ForgotPassword">
            {message.data?<h1 className={'ForgotPassword-'+message.color}>{message.data}</h1>:null}
            <form className="ForgotPassword-form" autoComplete='off' onSubmit={handleSubmit}>
                <h1>Type your email for password reset</h1>                
                <label htmlFor ="email"className="ForgotPassword-input-wrapper">
                        <input 
                        value={email} 
                        type="email" 
                        id="email"  
                        name="email" 
                        placeholder="&nbsp;"
                        onChange={(e)=>setEmail(e.target.value)}/>
                        <span>Email</span>
                        <img src={emailImg} alt="email"/>
                </label>
                <button className='ForgotPassword-submit' type="submit">Reset Password</button>   
            </form>
        </div>  
    )
}

export default ForgotPassword