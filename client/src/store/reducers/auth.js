import * as actionsType from '../actions/actionsType';


const handleSuccesAuth = (state, action) =>{
    return{
        ...state,
        token:action.payload.token,
        user:action.payload.user
    }
}
const handleLogout = (state) =>{
    return{
        ...state,
        token:null
    }
}
const handleUpdateProfile = (state, action) =>{
    return{
        ...state,
        user:action.payload.user
    }
}

const initialState = {
    token:null,
    user:null
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionsType.ON_SUCCESS_AUTH:
            return handleSuccesAuth(state, action)
        case actionsType.ON_LOGOUT:
            return handleLogout(state)
        case actionsType.ON_UPDATE_PROFILE_SUCCESS:
            return handleUpdateProfile(state, action)   
        default:
            return state;
    }
}

export default reducer;