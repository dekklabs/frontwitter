import { API_HOST, TOKEN } from "../utils/constant"
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consulta-relacion?id=${idUser}`

    const parans = {
        headers : {
            "Content-Type": "application/json",
            "Authorization" : `Bearer${getTokenApi()}`
        }
    }

    return fetch( url, parans )
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch(err => {
            return err
        })
}

export function followUserApi(idUser) {
    const url = `${API_HOST}/alta-relacion?id=${idUser}`

    const parans = {
        method: "POST",
        headers : {
            "Authorization": `Bearer${getTokenApi()}`
        }
    }

    return fetch( url, parans )
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch(err => {
            return err
        })
}

export function unFollowUserApi(idUser) {
    const url = `${API_HOST}/baja-relacion?id=${idUser}`

    const parans = {
        method: "DELETE",
        headers : {
            "Authorization": `Bearer${getTokenApi()}`
        }
    }

    return fetch( url, parans )
        .then(response => {
            return response.json()
        })
        .then( result => {
            return result
        })
        .catch(err => {
            return err
        })
}

export function getUserFollowApi(paramsUrl) {
    const url = `${API_HOST}/lista-usuarios?${paramsUrl}`

    const parans = {
        headers : {
            "Authorization": `Bearer${getTokenApi()}`
        }
    }

    return fetch( url, parans )
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        })
}