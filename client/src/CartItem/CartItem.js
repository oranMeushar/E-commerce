import React from 'react'
import './CartItem.css';
import recycleImg from '../assets/recycle.png';
import {connect} from 'react-redux';
import * as actions from '../store/actions/cart'
const CartItem = (props) => {

    const handleAddItem = () =>{
        props.onAddItem(props.product)
    }
    const handleRemoveItem = () =>{
        props.onRemoveItem(props.product)
    }
    const handleRemoveItems = () =>{
        props.onRemoveItems(props.product)
    }

    return (
        <div className="CartItem">
            <img className="CartItem-image" src={`http://localhost:5000/api/v1/products/image/${props.product._id}`} alt="CardImg"/>
            <div className="CartItem-details">
                <h1>{props.product.name}</h1>
                <h3><span>Price:</span>  {props.product.price}</h3>
                <h3><span>Category:</span>  {props.product.category}</h3>
                <div className="CartItem-recycle-wrapper">
                    <img 
                    onClick={handleRemoveItems} 
                    className="CartItem-recycle" 
                    src={recycleImg} alt="recycleImg"/>
                    <h3>Remove item</h3>
                </div>
            </div>
            <div className="CartItem-right">
                <div className="CartItem-right-buttons">
                    <button onClick={handleRemoveItem}>-</button>
                    <h3>{props.product.amount}</h3>
                    <button onClick={handleAddItem}>+</button>
                </div>
                <h2>${props.product.amount * props.product.price}</h2>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onAddItem:(item) =>dispatch(actions.handleAddItem(item)),
        onRemoveItem:(item) =>dispatch(actions.handleRemoveItem(item)),
        onRemoveItems:(item) =>dispatch(actions.handleRemoveItems(item))

    }
}
export default connect(null, mapDispatchToProps)(CartItem);
