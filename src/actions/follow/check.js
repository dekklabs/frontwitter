import { types } from "../../types/types";
import { API_HOST } from "../../utils/constant";

export const check = (idUser) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/consulta-relacion?id=${idUser}`
        const {token} = getState().auth

        const parans = {
            headers : {
                'Content-Type' : 'application/json',
                "Authorization": `Bearer${token}`
            },
        }

        const data = await fetch(url, parans)
        const {status} = await data.json()
        dispatch(checkFollowType(status))
    }
}

const checkFollowType = (status) => ({
    type: types.followCheck,
    payload : {
        status
    }
})