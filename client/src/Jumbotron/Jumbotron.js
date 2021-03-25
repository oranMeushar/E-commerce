import React from 'react'
import './Jumbotron.css';

const Jumbotron = (props) => {
    return (
        <div className="jumbotron">
            {props.children}
        </div>
    )
}

export default Jumbotron;
