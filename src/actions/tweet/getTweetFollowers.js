import { types } from "../../types/types"
import { API_HOST } from "../../utils/constant"

export const getTweetFollowers = (page = 1) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/leo-tweet-seguidores?pagina=${page}`
        const {token} = getState().auth

        const parans = {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer${token}`
            }
        }

        const data = await fetch(url, parans)
        const tweets = await data.json()

        page > 1 ? getTweetForPageFollowrsType(tweets) : dispatch(getTweetFollowrsType(tweets))

        //dispatch(getTweetFollowrsType(tweets))
    }
}

const getTweetFollowrsType = (tweets) => ({
    type: types.tweetGetFollow,
    payload: {
        tweets
    }
})

const getTweetForPageFollowrsType = (tweets) => ({
    type: types.followPage,
    payload: {
        tweets
    }
})