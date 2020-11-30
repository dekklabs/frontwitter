import { API_HOST } from "../../utils/constant"

export const getUserById = (id) => {
    return async (dispatch, getState) => {
        const {token} = getState().auth

        const url = `${API_HOST}/ver-perfil?id=${id}`

        const parans = {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer${token}`
            }
        }

        const data = await fetch(url, parans)
        const user = await data.json()

        return user
    }
}