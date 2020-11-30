import {types} from '../types/types'

const initialState = {
    tweet : [],
    tweets: []
}

export const tweetReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.tweetGetUser:
            return {
                tweet : action.payload.tweet
            }
        case types.tweetGetFollow:
            return {
                ...state,
                tweets: action.payload.tweets
            }
        case types.tweetClean:
            return initialState
        default:
            return state
    }
}