import React,{useState, useRef, useEffect} from 'react'
import './NewProfile.css';
import emailImg from '../assets/email.png';
import userImg from '../assets/user.png';
import * as api from '../util/api';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
const NewProfile = (props) => {
    const[name, setName] = useState(props.user.name);
    const[email, setEmail] = useState(props.user.email);
    const [cssClasses, setCssClasses] =useState('NewProfile-form');
    const[errorResponse, setErrorResponse] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        if (!props.isModal.value) {
            setName(props.user.name);
            setEmail(props.user.email);
            setCssClasses('NewProfile-form');
        }
        else{
            setCssClasses('NewProfile-form active');
        }
        // eslint-disable-next-line
    },[props.isModal.value]);


    const handleFailureResponse = (data) =>{
        let message = null;
        if (data.message.includes('E11000')) {
            message = 'Email already exists'
        }
        else{
            message = data.message.split(':')[0];
        }
        setErrorResponse(message)
        setTimeout(() => {
            setErrorResponse(null);
        }, 3000);

    }

    const handleSuccesResponse = (data) => {
        props.onSuccess(data.user);
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
        let endPoint = 'users';
        const content = {
            name,
            email,
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
        <div className="NewProfile">
            {message}
            <form className={cssClasses} onSubmit={handleSubmit}>
                <h1>Update Profile</h1>
                <label htmlFor="newName" className="NewProfile-form-input-wrapper">
                    <input 
                        type="text" 
                        ref = {inputRef}
                        id="newName"
                        placeholder="&nbsp;"
                        name="newName" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        onFocus = {(e) =>e.target.select()}/>
                    <span>Name</span>
                    <img src={userImg} alt="userImg"/>
                </label>
                <label htmlFor="newEmail" className="NewProfile-form-input-wrapper">
                    <input 
                        type="email" 
                        id="newEmail"
                        placeholder="&nbsp;"
                        name="newEmail" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        onFocus = {(e) =>e.target.select()}/>
                    <span>Email</span>
                    <img src={emailImg} alt="emailImg"/>
                </label>
                <button type="submit" className="NewProfile-form-submit">Update Profile</button>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(user)=>dispatch(actions.onUpdateProfileSuccess(user))
    }
}
const mapStateToProps = (state) =>{
    return{
        user:state.auth.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProfile);
