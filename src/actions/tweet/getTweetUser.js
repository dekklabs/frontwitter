import { types } from "../../types/types"
import { API_HOST } from "../../utils/constant"

export const getTweetUser = (page, idUser) => {
    return async (dispatch, getState) => {
        const {token} = getState().auth
        //const { user : {id} } = getState().user

        const url = `${API_HOST}/leo-tweet?id=${idUser}&pagina=${page}`

        const parans = {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer${token}`
            }
        }

        const data = await fetch(url, parans)
        const tweet = await data.json()
        
        dispatch(getTweetUserTyper(tweet))
    }
}

const getTweetUserTyper = (tweet) => ({
    type: types.tweetGetUser,
    payload: {
        tweet
    }
})