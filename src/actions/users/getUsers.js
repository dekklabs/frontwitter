import { API_HOST } from "../../utils/constant";
import {types} from '../../types/types'

export const getUsers = ({page, type, search}) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/lista-usuarios?page=${page}&search=${search}&type=${type}`
        const {token} = getState().auth

        const parans = {
            headers : {
                "Authorization": `Bearer${token}`
            }
        }

        const res = await fetch(url, parans)
        const users = await res.json()

        type === 'follow'
            ? dispatch(followUsersType(users))
            : dispatch(nuevoUsersType(users))
    }
}

const followUsersType = (users) => ({
    type: types.usersFollow,
    payload: {
        follow: users
    }
})

const nuevoUsersType = (users) => ({
    type: types.usersNew,
    payload: {
        nuevo: users
    }
})