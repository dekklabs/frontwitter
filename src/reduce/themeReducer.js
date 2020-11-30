import {types} from '../types/types'

const initialState = {
    theme: 'dark'
}

export const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.themeColor:
            return {
                theme: action.payload.theme
            }
        default:
            return state
    }
}