import { API_HOST } from "../../utils/constant"
import { getTweetUser } from "./getTweetUser"

export const addTweetUser = (mensaje) => {
    return (dispatch, getState) => {
        const url = `${API_HOST}/tweet`

        const {token} = getState().auth

        const data = {
            mensaje
        }

        const parans = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer${token}`
            },
            body: JSON.stringify(data)
        }

        fetch(url, parans)
        dispatch(getTweetUser(1))
    }
}