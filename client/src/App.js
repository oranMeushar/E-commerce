import React, {Suspense, useEffect} from 'react';
import './App.css';
import Layout from './Layout/Layout';
import{Switch, Route} from 'react-router-dom';
import * as api from './util/api';
import * as authActions from './store/actions/auth';
import * as cartActions from './store/actions/cart';

import {connect} from 'react-redux';
import {getLocalWithExpire} from './util/localStorage';

const Login = React.lazy(() =>import('./Login/Login'));
const Signup = React.lazy(() =>import('./Signup/Signup'));
const Home = React.lazy(() =>import('./Home/Home'));
const Logout = React.lazy(() =>import('./Logout/Logout'));
const UserDashboard = React.lazy(() =>import('./UserDashboard/UserDashboard'));
const AdminDashboard = React.lazy(() =>import('./AdminDashboard/AdminDashboard'));
const ForgotPassword = React.lazy(()=>import('./ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(()=>import('./ResetPassword/ResetPassword'));
const ProductDetails = React.lazy(()=>import('./ProductDetails/ProductDetails'));
const Orders = React.lazy(()=>import('./Orders/Orders'));
const Cart = React.lazy(()=>import('./Cart/Cart'));


const App = (props) => {

  useEffect(() =>{
    (async()=>{
      const endPoint = 'auth/isAuth';
      const [resault, data] = await api.get(endPoint)
      if (resault.status === 200) {
        props.onSuccessAuth(data.data.token, data.user);
      }
    })()

    //*get cart from local localStorage
    const cart = getLocalWithExpire();
    if (cart) {
      props.setCart(cart);
    }
    
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/'  component={Home}/>
            <Route exact path='/login'   component={Login}/>
            <Route exact path='/signup'  component={Signup}/>
            <Route exact path='/logout'  component={Logout}/>
              {
              props.token && props.user.role !== 'admin'?
              <Route exact path='/orders'  component={Orders}/>:null
            }
            {
              props.token && props.user.role !== 'admin'?
              <Route exact path='/cart'  component={Cart}/>:null
            }
            {
              props.token && props.user.role === 'admin'?
                <Route exact path='/admin/dashboard' component={AdminDashboard}/>:
                null
            }
            {
              props.token && props.user.role === 'authenticated'?
                <Route exact path='/user/dashboard' component={UserDashboard}/>:
                null
            }
            <Route exact path='/forgotPassword' component={ForgotPassword}/>
            <Route exact path='/ResetPassword/:resetToken' component={ResetPassword}/>
            <Route exact path='/products/:productId' component={ProductDetails}/>
            
          </Switch>
        </Suspense>
      </Layout>
      
    
    </div>
  );
}


const mapDispatchToProps = (dispatch) =>{
  return {
    onSuccessAuth:(token, user)=>dispatch(authActions.onSuccessAuth(token, user)),
    setCart:(cart)=>dispatch(cartActions.handleInitCart(cart))
  }
}
const mapStateToProps = (state) =>{
  return {
    token:state.auth.token, 
    user:state.auth.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
