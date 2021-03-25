import React,{useState, useRef, useEffect} from 'react'
import './NewCategory.css';
import * as api from '../util/api';
const NewCategory = (props) => {
    const[name, setName] = useState();
    const [cssClasses, setCssClasses] =useState('NewCategory-form');
    const[errorResponse, setErrorResponse] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        if (!props.isModal.value) {
            setName('');
            setCssClasses('NewCategory-form');
        }
        else{
            setCssClasses('NewCategory-form active');
        }
        // eslint-disable-next-line
    },[props.isModal.value]);


    const handleFailureResponse = (data) =>{
        let message = null;
        if (data.message.includes('E11000')) {
            message = 'Category already exists'
        }
        else{
            message = data.message.split(':')[0];
        }
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
        let endPoint = 'categories';
        const [result, data] = await api.post(endPoint, {name});
        if (result.status === 200) {
            handleSuccesResponse(data)
        }
        else{
            handleFailureResponse(data)
        }
    }

    let message = errorResponse?
        (<h1 className={`response-red`}>{errorResponse}</h1>)
        :null
    return (
        <div className="NewCategory">
            {message}
            <form className={cssClasses} onSubmit={handleSubmit}>
                <h1>New Category</h1>
                <label htmlFor="newCategory" className="NewCategory-form-input-wrapper">
                    <input 
                        type="text" 
                        ref = {inputRef}
                        id="newCategory"
                        placeholder="&nbsp;"
                        name="newCategory" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        onFocus = {(e) =>e.target.select()}/>
                    <span>Name</span>
                </label>
                <button type="submit" className="NewCategory-form-submit">Create Category</button>
            </form>
        </div>
    )
}

export default NewCategory;
