import React from 'react';
import './Modal.css';

const Modal = (props) => { 
    const cssClasses = ['Modal'];
    if (props.isModal.value) {
        cssClasses.push('active');
    }
    const handleModalClick = (e) =>{
        if (e.target.className.includes('Modal active')){
            props.setisModal({
                ...props.isModal,
                value:false
            });
        }
    }
    return (
        <div className={cssClasses.join(' ')} onClick={handleModalClick}>
            {props.children}
        </div>
    )
}

export default Modal
