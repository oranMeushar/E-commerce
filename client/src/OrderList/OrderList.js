import React, {useState, useEffect} from 'react';
import './OrderList.css';
import * as api from '../util/api';
import Order from '../Order/Order';
import rfdc from 'rfdc';
import Loader from '../Loader/Loader';
const OrderList = () => {
    
    const [orders, setOrders] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    useEffect(() =>{
        (async()=>{
            const endpoint = 'orders';
            setIsLoading(true)
            const[, data] = await api.get(endpoint);
            setIsLoading(false)
            setOrders(data.data)

        })()
    },[])

    const handleRemoveButton = async(orderToDelete) =>{
        let ordersCopy = rfdc()(orders);
        const index = ordersCopy.findIndex((order) =>order._id === orderToDelete._id)
        ordersCopy.splice(index, 1);
        setOrders(ordersCopy);
        const endpoint = `orders/${orderToDelete._id}`
        await api.remove(endpoint);
    }

    const loader = () =>{
        if (isLoading) {
            return(
                <Loader/>
            )
        }
    }
    return(
        <div className="OrderList">
            <div className="OrderList-titles">
                <h2>Order</h2>
                <h2>Created At</h2>
                <h2>Total Items</h2>
                <h2>Price</h2>
                <h2>Details</h2>
            </div>  
            {loader()}
            {
                orders.map((order) =>{
                    return(
                        <Order
                        key = {order._id}
                        removeOrder = {()=>handleRemoveButton(order)}
                        order={order}/>
                    )
                })
            }
        </div>
    )
}

export default OrderList;