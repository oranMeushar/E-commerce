import React, {useEffect, useState} from 'react';
import './Home.css';
import * as api from '../util/api';
import Card from '../Card/Card';
import Jumbotron from '../Jumbotron/Jumbotron';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Loader from '../Loader/Loader';

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [values, setValues] = useState({})
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('watch laptop all');
    const[isLoading, setIsLoading] = useState(false);
    
    useEffect(() =>{
        (async()=>{
            const endPoint = 'products';
            setIsLoading(true)
            const [, data] = await api.get(endPoint)
            setIsLoading(false)
            setProducts(data.data.products);
            setFiltered(data.data.products)
        })()
        // eslint-disable-next-line
    }, []);
    
    useEffect(() =>{
        let filtered = null;
        filtered = handleSearchAndSelect();
        if (values['shipping']) {
            filtered = handleShippings(filtered)
        }
        if (values['price']) {
            filtered = handlePrice(filtered);   
        }
        filtered = handleCategories(filtered);
        setFiltered(filtered);
        // eslint-disable-next-line
    },[search,select,values])

    useEffect(() => {
        setValues({})
    },[select])

    const jumbotron = () =>{
        return(
            <Jumbotron>
                <h1>Today Only: 20%<br/>Off Everything!</h1>
                <p>Harry up before it runs out</p>
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
    const handleAdvanced = (e) =>{
        if (e.target.name === 'price') {
            setValues({
                ...values,
                [e.target.name]:e.target.value
            })
        }
        else{
            if (e.target.checked) {
                setValues({
                    ...values,
                    [e.target.name]:e.target.value
                })
            }
            else{
                const properties = {...values}
                delete properties[e.target.name];
                setValues(properties)
            }
        }
    }

    const handleSearchAndSelect = () =>{
        return products.filter((product) =>{
            return  product.name.toLowerCase().includes(search.toLowerCase()) &&
                    select.includes(product.type)
        })
    }
    const handleShippings = (filtered) =>{
        return filtered.filter((product) =>{
          return  product.shipping
      });
    }
    const handlePrice = (filtered) =>{
        const minMax = values['price'].split('to');
        return filtered.filter((product) =>{
            return  parseInt(product.price) <= parseInt(minMax[1])&&
                    parseInt(product.price) >= parseInt(minMax[0])
        });
    }
    const handleCategories = (filtered) =>{
        const properties = {...values};
        delete properties['price'];
        delete properties['shipping'];
        let filteredCopy = [...filtered];
        let result = [];
        for (const key in properties) {
            filtered = filteredCopy.filter((product) =>{
                return  product.category === properties[key]
            });
            result.push(...filtered);
        }
        if (result.length !== 0) {
            return result
        }
        else{
            return filtered
        }
    }

    const filter  = () =>{
        return select.includes('all')?null:
        <Filter 
                select={select} 
                products={products}
                handleAdvanced={handleAdvanced}
                setValues = {setValues}
        />
    }

    return (
        <div className="Home">
            {jumbotron()}
            <Search 
                handleSearch = {setSearch}
                handleSelect = {setSelect}
            />
            {loader()}
            {filter()}
            <div className="Home-cards">
                {
                    filtered.map((product) =>{
                        return (
                            <Card 
                                key={product._id}
                                product={product}/>
                        )
                    })
                }
            </div>
        </div>
        
    )
}
export default Home;
