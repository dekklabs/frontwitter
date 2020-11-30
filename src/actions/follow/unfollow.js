import { types } from "../../types/types";
import { API_HOST } from "../../utils/constant";

export const unFollowUser = (idUser) => {
    return (dispatch, getState) => {
        const url = `${API_HOST}/baja-relacion?id=${idUser}`
        const {token} = getState().auth

        const parans = {
            method: "DELETE",
            headers : {
                "Authorization": `Bearer${token}`
            }
        }

        const data = fetch(url, parans)
        data.then(({status}) => {
            if( status >=200 && status <=300 ) {
                dispatch(unFollowType())
            }
        })
    }
}

const unFollowType = () => ({
    type : types.followUnFollow
})