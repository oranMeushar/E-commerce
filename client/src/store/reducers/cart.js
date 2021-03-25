import * as actionsType from '../actions/actionsType';
import rfdc from 'rfdc';

const initialState = {
    cart:[],
    totalPrice:0,
    totalItems:0,
}


const setLocalStorage = (stateCopy) =>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.user = stateCopy; 
    localStorage.setItem('cart', JSON.stringify(cart));
}

const handleAddItem = (state, action) =>{
    const newItem = action.payload;
    const stateCopy = rfdc()(state);
    const foundItem = stateCopy.cart.find((item) =>{
        return item._id === newItem._id; 
    });

    if(!foundItem){
        newItem.amount = 1;
        stateCopy.cart.push(newItem);
    }
    else{
        foundItem.amount += 1;
    }
    stateCopy.totalItems += 1;
    stateCopy.totalPrice += newItem.price;
    setLocalStorage(stateCopy);
    return stateCopy;
}



const handleRemoveItem = (state, action) =>{
    const item = action.payload;
    if (item.amount === 1) {
        return handleRemoveItems(state, action)
    }
    const stateCopy = rfdc()(state);
    const foundItem = stateCopy.cart.find((oldItem) =>{
        return item._id === oldItem._id;
    });
 
     foundItem.amount -= 1;
     stateCopy.totalItems -= 1;
     stateCopy.totalPrice -= foundItem.price;
     setLocalStorage(stateCopy);
     return stateCopy;
}
const handleRemoveItems = (state, action) =>{
    const item = action.payload;
    const stateCopy = rfdc()(state);

    const foundItem = stateCopy.cart.find((oldItem) =>{
        return item._id === oldItem._id;
    });

    const index = stateCopy.cart.findIndex((oldItem) =>{
        return item._id === oldItem._id;
    });

    stateCopy.totalItems -= foundItem.amount;
    stateCopy.totalPrice -= (foundItem.amount * foundItem.price);

    stateCopy.cart.splice(index, 1);
    setLocalStorage(stateCopy);
    return stateCopy;
}

const handleResetCart = () =>{
    return{
        cart:[],
        totalItems:0,
        totalPrice:0
    }
}
const handleInitCart = (state, action) =>{
    return {
        ...state,
        ...action.payload
    }
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionsType.ADD_TO_ITEM:
            return handleAddItem(state, action)
        case actionsType.REMOVE_ITEM:
            return handleRemoveItem(state, action)
        case actionsType.REMOVE_ITEMS:
            return handleRemoveItems(state, action)
        case actionsType.RESET_CART:
                return handleResetCart()
        case actionsType.INIT_CART:
            return handleInitCart(state, action)    
        default:
            return state;
    }
}

export default reducer