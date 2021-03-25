import * as actionsType from './actionsType';


export const onSuccessAuth = (token, user) =>{
    return {
        type:actionsType.ON_SUCCESS_AUTH,
        payload:{
            token,
            user
        }
    }
}
export const onUpdateProfileSuccess = (user) =>{
    return {
        type:actionsType.ON_UPDATE_PROFILE_SUCCESS,
        payload:{
            user
        }
    }
}

export const onLogout = () =>{
    return {
        type:actionsType.ON_LOGOUT,
    }
}