import React from 'react'
import searchImg from '../assets/search2.png';
import './Search.css';

const Search = (props) => {
    return (
        <div className="Search">
            <select onChange={(e)=>props.handleSelect(e.target.value)}>
                <option defaultValue='watch laptop all' value='watch laptop all'>All</option>
                <option value='watch'>Watch</option>
                <option value='laptop'>Laptop</option>
            </select>
                <div className="Search-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by name"
                        onChange={(e)=>props.handleSearch(e.target.value)}/>
                        <img className="Search-image" src={searchImg} alt="search-img"/>
                </div>
        </div>
    )
}

export default Search
