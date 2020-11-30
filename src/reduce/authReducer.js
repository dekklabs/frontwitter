import { types } from '../types/types';

const initialState = {
    token: null,
    logged: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.login:
            return {
                ...state,
                token: action.payload.token,
            }
        case types.logged:
            return {
                ...state,
                logged: true
            }
        case types.logout:
            return initialState
        default:
            return state
    }
}