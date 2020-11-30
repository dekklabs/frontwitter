import {types} from '../types/types'

const initialState = {
    status: false,
    follow: false
}

export const followReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.followCheck:
            return {
                ...state,
                status: action.payload.status
            }
        case types.followUser:
            return {
                ...state,
                follow: true
            }
        case types.followUnFollow:
            return {
                ...state,
                follow: false
            }
        case types.followPage:
            return {
                ...state,
                follow: {
                    ...action.payload
                }
            }
        case types.followClean:
            return initialState
        default:
            return state
    }
}