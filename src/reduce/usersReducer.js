import {types} from '../types/types'

const initialState = {
    follow: [],
    nuevo: []
}

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.usersFollow:
            return {
                ...state,
                follow: action.payload.follow
            }
        case types.usersNew:
            return {
                ...state,
                nuevo: action.payload.nuevo
            }
        case types.usersClean:
            return initialState
        default:
            return state
    }
}