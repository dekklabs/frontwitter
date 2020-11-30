import { types } from "../../types/types";
import { API_HOST } from "../../utils/constant";

export const followUser = (idUser) => {
    return (dispatch, getState) => {
        const url = `${API_HOST}/alta-relacion?id=${idUser}`
        const {token} = getState().auth

        const parans = {
            method: "POST",
            headers : {
                "Authorization": `Bearer${token}`
            }
        }

        const data = fetch(url, parans)
        data.then(({status}) => {
            if( status >=200 && status <=300 ) {
                dispatch(followType())
            }
        })
    }
}

const followType = () => ({
    type : types.followUser
})