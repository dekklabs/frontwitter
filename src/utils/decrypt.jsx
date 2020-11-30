import jwtDecode from "jwt-decode";

export const decryptUser = (token) => {
    if(!token) {
        return null
    }

    if( isExpireToken(token) ) {
        return null
    }

    return jwtDecode(token)
}

export const isExpireToken = (token) => {
    const {exp} = jwtDecode(token)
    const expire = exp * 1000
    const timeOut = expire - Date.now()

    if(timeOut < 0) {
        return true
    }

    return false
}