import { types } from "../types/types";
import { API_HOST } from "../utils/constant";
import { decryptUser } from "../utils/decrypt";

export const getPerfil = () => {
    return async (dispatch, getState) => {
        const {token} = getState().auth
        const {_id} = decryptUser(token)

        const url = `${API_HOST}/ver-perfil?id=${_id}`

        const parans = {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer${token}`
            }
        }

        const data = await fetch(url, parans)
        const perfil = await data.json()

        dispatch(profileType(perfil))
    }
}

export const getLoaduser = (id) => {
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

        dispatch(userType(user))
    }
}

export const profileType = (profile) => ({
    type: types.userProfile,
    payload: {
        profile
    }
})

export const userType = (user) => ({
    type: types.userLoad,
    payload: {
        user
    }
})

export const userClear = () => ({
    type: types.userClear
})