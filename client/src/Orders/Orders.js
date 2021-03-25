import React from 'react'
import './Orders.css';
import OrderList from '../OrderList/OrderList';
import Jumbotron from '../Jumbotron/Jumbotron';
const Orders = () => {

    const jumbotron = () =>{
        return(
            <Jumbotron>
                <h1>Your Orders History</h1>
            </Jumbotron>
        )
    }
    return (
        <div className="Orders">
            {jumbotron()}
            <OrderList/>
        </div>
    )
}

export default Orders;
