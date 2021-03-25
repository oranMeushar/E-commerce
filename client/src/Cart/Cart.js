import React from 'react'
import './Cart.css';
import CartList from '../CartList/CartList';
import Jumbotron from '../Jumbotron/Jumbotron';

const Cart = (props) => {

    const jumbotron = () =>{
        return(
            <Jumbotron>
                <h1>Your Shopping Cart</h1>
                <p>That little bucket of joy</p>
            </Jumbotron>
        )
    }
    return (
        <div className="Cart">
            {jumbotron()}
            <CartList/>
        </div>
    )
}


export default Cart;
