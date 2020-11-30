import { API_HOST } from "../utils/constant"
import { getTokenApi } from "./auth";

export const getUserApi = (id) => {
    const url = `${API_HOST}/ver-perfil?id=${id}`

    const parans = {
        headers : {
            "Content-Type": "application/json",
            "Authorization" : `Bearer${getTokenApi()}`
        }
    }

    return fetch(url, parans).then(response => {
        if (response.status >= 400 ) {
            console.error("error")
        }
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}

export const uploadBannerApi = (file) => {
    const url = `${API_HOST}/subir-banner`

    const formData = new FormData()
    formData.append("banner", file)

    const parans = {
        method: "POST",
        headers : {
            "Authorization" : `Bearer${getTokenApi()}`
        },
        body: formData
    }

    return fetch( url, parans)
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

export const uploadAvatarApi = (file) => {
    const url = `${API_HOST}/subir-avatar`

    const formData = new FormData()
    formData.append("avatar", file)

    const parans = {
        method: "POST",
        headers : {
            "Authorization" : `Bearer${getTokenApi()}`
        },
        body: formData
    }

    return fetch( url, parans)
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch( err => {
            return err
        })
}

export const updateInfoApi = (data) => {
    const url = `${API_HOST}/modificar-perfil`

    const parans = {
        method: "PUT",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }

    return fetch( url, parans )
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })
}