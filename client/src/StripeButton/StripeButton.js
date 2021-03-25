import React from 'react';
import StripeCheckOut from 'react-stripe-checkout';


const StripeButton = (props) =>{
    const stripePrice = props.price * 100;
    const publishableKey = process.env.REACT_APP_STRIPE_KEY
    return(
        <div className="StripeButton">
            <StripeCheckOut
                token = {props.clicked}
                stripeKey = {publishableKey}
                label = "Continue To Checkout"
                name="OM E-commerce"
                shippingAddress
                billingAddress
                description = {`Total price of $${props.price}`}
                amount = {stripePrice}
                panelLabel = 'Pay Now'
                email="info@vidhub.co"
            />
        </div>
        
    )
}

export default StripeButton;