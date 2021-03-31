import React, {useState, useEffect} from 'react'
import './Filter.css';
const Filter = (props) => {
    const [cssClasses, setCssClasses] = useState('Filter');
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
 
        if (!props.select.includes('all')) {
            const set = new Set();
            setCssClasses('Filter active');
            props.products.forEach(product => {
                if (product.type === props.select) {
                    set.add(product.category)
                }
            });
            setCategories([...set]);
        }
        else{
            setCssClasses('Filter');
        }
        // eslint-disable-next-line
    },[props.select])

    return (
        <div className={cssClasses}>
            <h1>Advanced Filter</h1>
            <form className="Filter-container" onChange={props.handleAdvanced}>
                <div className="Filter-container-checkbox">
                    <h3 className="Filter-container-sub-header">Category</h3>
                    {
                        categories.map((category, i) => {
                             return (
                                 <label key={`${category}-${i}`}>
                                    {category}
                                    <input type="checkbox" value={category} name={category}/>
                                 </label>
                             )                   
                        })
                    }
                </div>
                <div className="Filter-container-radio">
                    <h3 className="Filter-container-sub-header">Price</h3>
                    <label>
                        All<input type="radio" key={props.select} name="price" value="0 to 9999999"/>
                    </label>
                    <label>
                        $0 to $999<input type="radio" key={props.select} name="price" value="0 to 999"/>
                    </label>
                    <label>
                        $1000 to $2999<input type="radio" key={props.select} name="price" value="1000 to 2999"/>
                    </label>
                    <label>
                        $3000 to $4999<input type="radio" key={props.select} name="price" value="3000 to 4999"/>
                    </label>
                    <label>
                        $5000 and above<input type="radio" key={props.select} name="price" value="5000 to 999999"/>
                    </label>
                </div>
                <div className="Filter-container-shipping">
                    <h3 className="Filter-container-sub-header">Shipping</h3>
                    <label>
                        Shipping<input type="checkbox" key={props.select} name="shipping" value="true"/>
                    </label>
                </div>
            </form>
        </div>
    )
}
export default Filter;
