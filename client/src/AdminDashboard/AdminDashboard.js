import React, {useState}from 'react'
import './AdminDashboard.css';
import {connect} from 'react-redux';
import profileImg from '../assets/profile.png';
import updateProfileImg from '../assets/changeProfile.png';
import changePasswordImg from '../assets/changPassword.png';
import newProductImg from '../assets/newProduct.png';
import Modal from '../Modal/Modal';
import NewPassword from '../NewPassword/NewPassword';
import NewProfile from '../NewProfile/NewProfile';
import NewCategory from '../NewCategory/NewCategory';
import NewProduct from '../NewProduct/NewProduct';


const AdminDashboard = (props) => {

    const [isModal, setisModal] = useState({
        value:false,
        currentChild:''
    });

    const [response, setResponse] = useState(null);
    

    const jumbotron = () =>{
        return(
            <div className="AdminDashboard-jumbotron">
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

    const handleNewCategory = () =>{
        setisModal({
            value:true,
            currentChild:'new-category'
        }) 
    }

    const handleNewProduct = () =>{
        setisModal({
            value:true,
            currentChild:'new-product'
        }) 
    }

    const links = () =>{
        return(
            <div className="AdminDashboard-links">
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
                            <img src={newProductImg} alt="newProductImg"/>
                            <button onClick={handleNewCategory}>Create Category</button> 
                        </li>
                        <li>
                            <img src={newProductImg} alt="newProductImg"/>
                            <button onClick={handleNewProduct}>Create Product</button> 
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
        case 'new-category':
            child = (
                <NewCategory 
                    isModal = {isModal} 
                    setisModal = {setisModal}
                    setResponse = {setResponse}
                />
            )
            break;
        case 'new-product':
            child = (
                <NewProduct 
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
            <div className="AdminDashboard">
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
export default connect(mapStateToProps)(AdminDashboard);;
