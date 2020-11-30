import { API_HOST } from "../../utils/constant"

export const update = (profile) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/modificar-perfil`;
        const {token} = getState().auth

        const parans = {
            method: "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer${token}`
            },
            body: JSON.stringify(profile)
        }

        await fetch(url, parans)
    }
}