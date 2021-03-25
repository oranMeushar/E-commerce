import React from 'react';
import './Order.css';

const Order = (props) => {

    return(
        <div className="Order">
            <h2>{props.order._id.slice(16, props.order._id.length)}</h2>
            <h2>{props.order.createdAt}</h2>
            <h2>{props.order.totalItems}</h2>
            <h2>${props.order.totalPrice}</h2>
            {<a className="Order-details" target="_blank" rel="noreferrer" href={`http://localhost:5000/api/v1/orders/${props.order._id}`}>Download</a>}
            <button className="Order-remove" onClick={props.removeOrder}>X</button>
        </div>
    )
}

export default Order;