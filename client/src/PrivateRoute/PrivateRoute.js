import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
const PrivateRoute = (props) => {

    useEffect(() =>{
        if (props.token) {
            return (
                <Route exact path={props.path} component={props.component}/>
            )
        }
        else{
            return null;
        }
    },[props.token])

    return null;
    
    
}


const mapStateToProps = (state) =>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(PrivateRoute);
