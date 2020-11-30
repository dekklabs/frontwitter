import {API_HOST} from "../utils/constant"
import {types} from '../types/types'
import { finishLoading, startLoading } from "./ui"
import { getPerfil } from "./user"

export const register = (usuario) => {
    return async (dispatch) => {
        const url = `${API_HOST}/registro`
    
        dispatch(startLoading())

        const parans = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(usuario)
        }

        await fetch(url, parans)
        dispatch(finishLoading())
    }
}

export const login = (usuario)  => {
    return async(dispatch) => {
        const url = `${API_HOST}/login`
        dispatch(startLoading())
        const parans = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(usuario)
        }

        dispatch(finishLoading())
        
        const res = await fetch(url, parans)
        const {token} = await res.json()
        
        dispatch(loginType(token))
        dispatch(loggedType())
        dispatch(getPerfil())
    }
}

export const loginType = (token) => ({
    type : types.login,
    payload: {
        token
    }
})

export const loggedType = () => ({
    type: types.logged
})

export const logOutType = () => ({
    type: types.logout
})