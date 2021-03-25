import React from 'react';
import './Card.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/cart';


const Card = (props) => {
    let descriptionArray = props.product.description.split(' ');
    let description = '';
    descriptionArray.forEach((word, i)=> {
        if (i < 3) {
            description += ' ' + word;
        }
    });

    const handleProductDetail = (e) =>{
        props.history.push(`/products/${props.product._id}`)
    }

    const handleAddItem = () =>{
        if (props.token) {
            return props.onAddItem(props.product)
        }
        props.history.push({
            pathname:'/login',
            search:'?auth=false'
        })
    }
    
    return (
        <div className="Card">
            <h1>{props.product.name}</h1>   
            <div className="Card-img-wrapper">
                <img src={`http://localhost:5000/api/v1/products/image/${props.product._id}`} alt="CardImg"/>
            </div>  
            <h3 className="CardDescription">{description}...</h3>
            <div className="Card-details">
                <p className="CardPrice"><span>Price: </span>${props.product.price}</p>
                <p className="CardCategory"><span>Category: </span> {props.product.category}</p>
                {
                    props.product.quantity > 0?
                    <p className="Card-available">Available &#10004;&#65039;</p>:
                    <p className="Card-available">Available &#x274C;</p>
                }
                {
                    props.product.shipping?
                    <p className="Card-shipable">Shipping &#10004;&#65039;</p>:
                    <p className="Card-shipable">Shipping &#x274C;</p>
                }
            </div>
        
            
            <div className="Card-buttons">
                <button onClick={handleProductDetail}>View Product</button>
                <button onClick={handleAddItem}>Add To Cart</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAddItem:(item) =>dispatch(actions.handleAddItem(item))
    }
}
const mapStateToProps = (state) =>{
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
