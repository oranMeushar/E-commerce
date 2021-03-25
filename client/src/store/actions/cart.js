import * as actionsType from './actionsType';


export const handleAddItem = (item) =>{
    return{
        type:actionsType.ADD_TO_ITEM,
        payload:item
    }
}
export const handleRemoveItem = (item) =>{
    return{
        type:actionsType.REMOVE_ITEM,
        payload:item
    }
}
export const handleRemoveItems = (item) =>{
    return{
        type:actionsType.REMOVE_ITEMS,
        payload:item
    }
}
export const handleResetCart = () =>{
    return{
        type:actionsType.RESET_CART
    }
}
export const handleInitCart = (cart) =>{
    return{
        type:actionsType.INIT_CART,
        payload:cart
    }
}