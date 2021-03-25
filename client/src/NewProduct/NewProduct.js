import React,{useState, useRef, useEffect} from 'react'
import './NewProduct.css';
import * as api from '../util/api';
const NewProduct = (props) => {
    const[values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        category:'',
        quantity:'',
        type:'',
        image:null,
        shipping:false
    });
    const [categories, setCategories] = useState([]);
    const [cssClasses, setCssClasses] =useState('NewProduct-form');
    const[errorResponse, setErrorResponse] = useState(null);
    const inputRef = useRef();
    const checkboxRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        if (!props.isModal.value) {
            setValues({
                name:'',
                description:'',
                price:'',
                category:'',
                quantity:'',
                type:'',
                image:'',
                shipping:false
            })
            setCssClasses('NewProduct-form');
            setCategories([]);
            checkboxRef.current.checked = false;
        }
        else{
            setCssClasses('NewProduct-form active');
        }
        // eslint-disable-next-line
    },[props.isModal.value]);

    useEffect(() => {
        if (props.isModal.value) {
            (async()=>{
                const endpoint = 'categories';
                const [, data] = await api.get(endpoint);
                setCategories(data.data)
            })()

        }
        // eslint-disable-next-line
    }, [props.isModal.value]);


    const handleFailureResponse = (data) =>{
        let message = null;
        message = data.message.split(':')[0];
        setErrorResponse(message)
        setTimeout(() => {
            setErrorResponse(null);
        }, 3000);
    }

    const handleSuccesResponse = (data) => {
        props.setResponse(data.message);
        props.setisModal({
            ...props.isModal,
            value:false,
        })
        setTimeout(() => {
            props.setResponse(null);
        }, 3000);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let endPoint = 'products';
        const formData = new FormData();
        for (const key in values) {
            formData.set(key, values[key])
        }
        const [result, data] = await api.postWithFile(endPoint, formData);
        if (result.status === 200) {
            handleSuccesResponse(data)
        }
        else{
            handleFailureResponse(data)
        }
    }

    const handleChange = (e, name) =>{
        if (name ==='shipping') {
            return setValues({
                ...values,
                [name]:e.target.checked
            }) 
        }
        if (name ==='image') {
            return setValues({
                ...values,
                [name]:e.target.files[0]
            }) 
        }
        return setValues({
            ...values,
            [name]:e.target.value
        })   
    }

    let message = errorResponse?
        (<h1 className={`response-red`}>{errorResponse}</h1>)
        :null
    return (
        <div className="NewProduct">
            {message}
            <form className={cssClasses} onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>New Product</h1>
                <label className="NewProduct-form-input-wrapper">
                    <input 
                        type="text" 
                        ref = {inputRef}
                        placeholder="&nbsp;"
                        value={values.name}
                        onChange={(e)=>handleChange(e, 'name')}/>
                    <span>Name</span>
                </label>
                <label className="NewProduct-form-input-wrapper">
                    <textarea 
                        placeholder="Description" 
                        value={values.description}
                        onChange={(e)=>handleChange(e, 'description')}/>
                </label>
                <label className="NewProduct-form-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="&nbsp;"
                        value={values.type}
                        onChange={(e)=>handleChange(e, 'type')}/>
                    <span>Type</span>
                </label>
                <select  
                    className="NewProduct-select" 
                    onChange={(e)=>handleChange(e, 'category')}>
                    <option value="">Select Category</option>
                    {categories.map((category) =>{
                        return <option key={category._id} value={category.name}>{category.name}</option>
                    })}
                </select>
                <label className="NewProduct-form-input-wrapper">
                    <input 
                        type="number" 
                        placeholder="&nbsp;"
                        value={values.price}
                        onChange={(e)=>handleChange(e, 'price')}/>
                    <span>Price</span>
                </label>
                <label className="NewProduct-form-input-wrapper">
                    <input 
                        type="number"
                        min="0" 
                        placeholder="&nbsp;"
                        name="quantity" 
                        value={values.quantity}
                        onChange={(e)=>handleChange(e, 'quantity')}/>
                    <span>Quantity</span>
                </label>
                <input 
                    type="file" 
                    accept="image/*"
                    name="image"
                    className="NewProduct-file" 
                    onChange={(e)=>handleChange(e, 'image')}
                />
                <label htmlFor="productShipping" className="NewProduct-shipping">
                    <span>Shipping:</span>
                        <input 
                            type="checkbox" 
                            ref={checkboxRef}
                            value={values.shipping}
                            onChange={(e)=>handleChange(e, 'shipping')}
                        />
                </label>
                <button type="submit" className="NewProduct-form-submit" onClick={handleSubmit}>Create Product</button>
            </form>
        </div>
    )
}

export default NewProduct;
