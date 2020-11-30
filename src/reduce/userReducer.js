import {types} from '../types/types'

const initialState = {
    profile: {},
    user: {}
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.userProfile:
            return {
                ...state,
                profile: {
                    ...action.payload.profile
                }
            }
        case types.userLoad:
            return {
                ...state,
                user: {
                    ...action.payload.user
                }
            }
        case types.userProfileUpdate:
            return {
                ...state,
                profile: {
                    ...action.payload.profile
                }
            }
        case types.userClear:
            return initialState
        default:
            return state
    }
}