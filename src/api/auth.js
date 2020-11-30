import { API_HOST, TOKEN } from "../utils/constant"
import jwtDecode from "jwt-decode";

export function signUpApi(user) {
    
    const url = `${API_HOST}/registro`
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: new Date()
    }
    delete userTemp.repeatPassword;

    const parans = {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(userTemp)
    }

    return fetch( url, parans ).then( response => {
        if ( response.status >= 200 && response.status < 300 ) {
            return response.json()
        }
        return { code: 404, message: "Emmai no disponible" }
    }).then( result => {
        return result
    }).catch( err => {
        return err
    })
}

export function signInApi (user) {
    const url = `${API_HOST}/login`

    const data = {
        ...user,
        email: user.email.toLowerCase()
    }

    const parans = {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch( url, parans )
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json()
            }
            return {message:"Usuario o contraseña incorrecto"}
        })
        .then(result => {
            return result
        })
        .catch( err => {
            return err
        })
}

export const setTokenApi = (token) => {
    localStorage.setItem(TOKEN, token)
}

export const getTokenApi = () => {
    return localStorage.getItem(TOKEN)
}

export const logoutApi = () => {
    localStorage.removeItem(TOKEN)
}

export const isUserLogedApi = () => {
    const token = getTokenApi()
    if (!token) {
        logoutApi()
        return null
    }
    if ( isExpiredToken(token) ) {
        logoutApi()
    }

    return jwtDecode(token)
}

export const isExpiredToken = (token) => {
    const { exp } = jwtDecode(token)
    const expire = exp * 1000
    const timeOut = expire - Date.now()

    if (timeOut < 0) {
        return true
    }

    return false
}