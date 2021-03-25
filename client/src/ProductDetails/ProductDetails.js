import React,{useState, useEffect} from 'react';
import './ProductDetails.css';
import Jumbotron from '../Jumbotron/Jumbotron';
import * as api from '../util/api';
import {Link} from 'react-router-dom';
import Loader from '../Loader/Loader';
const ProductDetails = (props) => {

    const [product, setProduct] = useState({});
    const[relatedProducts, setRelatedProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const endpoint = `products/${props.match.params.productId}`;
        (async()=>{
            setIsLoading(true)
            const [, data] = await api.get(endpoint)
            setIsLoading(false)
            setProduct(data.data)
        })()
    },[props.match.params.productId])
    useEffect(() => {
        const endpoint = `products/related/${props.match.params.productId}`;
        (async()=>{
            setIsLoading(true)
            const [, data] = await api.get(endpoint)
            setIsLoading(false)
            setRelatedProducts(data.data.relatedDocs)
        })()
    },[props.match.params.productId])
    

    const jumbotron = () =>{
        return(
            <Jumbotron>
                <h1>Product Details</h1>
                <h2>{product.name}</h2>
            </Jumbotron>
        )
    }
    const loader = () =>{
        if (isLoading) {
            return(
                <Loader/>
            )
        }
    }

    const showProduct = () =>{
        return(
            <div className="ProductDetails-details">
                <div className="ProductDetails-details-image">
                    <img src={`http://localhost:5000/api/v1/products/image/${product._id}`} alt="CardImg"/>
                </div>
                <div className="ProductDetails-details-Content">
                    <h2><span>Name:</span> {product.name}</h2>
                    <h2><span>Price:</span> {product.price}</h2>
                    <h2><span>Category:</span> {product.category}</h2>
                    {
                        product.shipping? 
                        <h2><span>Shipping:</span> &#10004;&#65039;</h2>:
                        <h2><span>Shipping:</span> &#x274C;</h2>
                    }
                    <h2><span>Description:</span> {product.description}</h2>
                    <h2><span>At hand:</span> {product.quantity - product.sold}</h2>
                    <div className="ProductDetails-details-list">
                        <h2><span>About This Item:</span></h2>
                        <ul>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    const showRelated = () =>{
        let url = 'http://localhost:5000/api/v1/products/image/';
        
        return(
            <div className="ProductDetails-related">
                <h1>You might be interested in:</h1>
                <div className="ProductDetails-related-list">
                    {relatedProducts.map((product) =>{
                        return (
                            <Link to={`/products/${product._id}`} key={product._id}>
                                <img src={`${url}${product._id}`} alt="relatedImg"/>
                            </Link>
                            
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="ProductDetails">
            {jumbotron()}
            {loader()}
            {showProduct()}
            {showRelated()}
        </div>
    )
}

export default ProductDetails
