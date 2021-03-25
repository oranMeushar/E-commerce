import React, {useState} from 'react'
import './CartList.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/cart';
import CartItem from '../CartItem/CartItem';
import StripeButton from '../StripeButton/StripeButton';
import * as api from '../util/api';
import {withRouter} from 'react-router-dom';
import Loader from '../Loader/Loader';
const CartList = (props) => {

    const [info, setInfo] = useState(false)
    const[isLoading, setIsLoading] = useState(false);

    const handleStripeButton = async(token) =>{
        const endpoint = 'orders';
        const content = {
            items:props.cart,
            totalItems:props.totalItems,
            totalPrice:props.totalPrice
        }
        setIsLoading(true)
        const[, data] = await api.post(endpoint, content);
        handleSuccesResponse(data)
    }

    const handleSuccesResponse = (data) => {
        setIsLoading(false)
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.user = {
            cart:[],
            totalItems:0,
            totalPrice:0,
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        props.resetCart();
        props.history.push('/orders');
    }
    const loader = () =>{
        if (isLoading) {
            return(
                <Loader/>
            )
        }
    }


    const cartListSummary = () =>{
        return(
            <div className="CartList-summary">
                <h1>ORDER SUMMARY</h1>
                <h3>Total Items: {props.totalItems}</h3>
                <h3>Price: ${props.totalPrice}</h3>
                <h3>Discount: ${(props.totalPrice * 0.2).toFixed(2)}</h3>
                <h2><span className="dark-red">ORDER TOTAL </span>${(props.totalPrice * 0.8).toFixed(2)}</h2>
                <StripeButton
                    price = {(props.totalPrice * 0.8).toFixed(2)}
                    clicked = {handleStripeButton}
                />
                <button className="info-button" onClick={()=>setInfo(!info)}>&#33;</button>
                <p className={showInfoClass.join(' ')}>Test credit card:<br/>
                        Credit Number: 4242 4242 4242 4242<br/>
                        Exp: 01/22<br/>
                        CVC:123
                </p>
            </div>
        )
    }

    const showEmptyHeader = () =>{
        return(
            <h1 className="CartList-empty-header">Cart is currently empty</h1>
        )
    }
    
    let showInfoClass = ["CartList-info"];
    if (info) {
        showInfoClass.push("active");
    }
    return (
        <>
            {loader()}
            <div className="CartList">
                <div className="CartList-list-wrapper">
                    {
                        props.cart.map((product) =>{
                            return <CartItem product={product} key={product._id}/>
                        })
                    }
                </div>
                {
                    props.cart.length !== 0?cartListSummary():showEmptyHeader()
                }
            </div>
        </>
    )
}
const mapStateToProps = (state)=>{
    return{
        cart:state.cart.cart,
        totalPrice:state.cart.totalPrice,
        totalItems:state.cart.totalItems
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        resetCart:()=>dispatch(actions.handleResetCart())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartList));
