import React, {useState}from 'react'
import './UserDashboard.css';
import {connect} from 'react-redux';
import profileImg from '../assets/profile.png';
import updateProfileImg from '../assets/changeProfile.png';
import ordersHistory from '../assets/ordersHistory.png';
import changePasswordImg from '../assets/changPassword.png';
import cartImg from '../assets/cart.png';
import Modal from '../Modal/Modal';
import NewPassword from '../NewPassword/NewPassword';
import NewProfile from '../NewProfile/NewProfile';
import {Link} from 'react-router-dom';

const UserDashboad = (props) => {

    const [isModal, setisModal] = useState({
        value:false,
        currentChild:''
    });

    const [response, setResponse] = useState(null);
    

    const jumbotron = () =>{
        return(
            <div className="UserDashboad-jumbotron">
                <img src={profileImg} alt="profileImg"/>
                <h1>Name: {props.user.name}</h1>
                <h1>Email: {props.user.email}</h1>
                <h1>Role: {props.user.role}</h1>
            </div>
        )
    }

    const handleUpdateProfile = (e) =>{
        setisModal({
            value:true,
            currentChild:'update-profile'
        })
        
    }

    const handleChangePassword = () =>{
        setisModal({
            value:true,
            currentChild:'change-password'
        })   
    }

    const links = () =>{
        return(
            <div className="UserDashboad-links">
                <nav>
                    <ul>
                        <li>
                            <img src={updateProfileImg} alt="updateProfileImg"/>
                            <button onClick={handleUpdateProfile}>Update Profile</button>  
                        </li>
                        <li>
                            <img src={changePasswordImg} alt="changePasswordImg"/>
                            <button onClick={handleChangePassword}>Change Password</button> 
                        </li>
                        <li>
                            <img src={cartImg} alt="cartImg"/>
                            <Link to='/cart'>My Cart</Link>
                        </li>
                        <li>
                            <img src={ordersHistory} alt="ordersHistory"/>
                            <Link to='/orders'>Orders History</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    let child = null;
    switch (isModal.currentChild) {
        case 'update-profile':
            child = (
                <NewProfile 
                    isModal = {isModal} 
                    setisModal = {setisModal}
                    setResponse = {setResponse}
                />
            )
            break;
        case 'change-password':
            child = (
                <NewPassword 
                    isModal = {isModal} 
                    setisModal = {setisModal}
                    setResponse = {setResponse}
                />
            )
            break;
    
        default:
            break;
    }

    let message = response?
        (<h1 className={`response-green`}>{response}</h1>)
        :null

    return (
        <>
            {message}
            <div className="UserDashboad">
                <Modal isModal = {isModal} setisModal = {setisModal}>
                    {child}
                </Modal>
                {jumbotron()}
                {links()}
            </div>
        </>
    )
}


const mapStateToProps = (state) =>{
    return {
      token:state.auth.token, 
      user:state.auth.user
    }
}
export default connect(mapStateToProps)(UserDashboad);;
