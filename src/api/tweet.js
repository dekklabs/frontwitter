import { API_HOST } from "../utils/constant"
import { getTokenApi } from "./auth";

export function addTweetApi(mensaje) {
    const url = `${API_HOST}/tweet`

    const data = {
        mensaje
    }

    const parans = {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization" : `Bearer${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }

    return fetch( url, parans )
        .then(response => {
            if( response.status >= 200 && response.status < 300 ) {
                return {code : response.status, message: "Tweet enviado"}
            }
            return {code: 500, message: "Error del servidor"}
        })
        .then(err => {
            return err
        })
}

export function getUserTweetApi(idUser, page) {
    const url = `${API_HOST}/leo-tweet?id=${idUser}&pagina=${page}`

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
        .catch(err => {
            return err
        })
}

export function getTweetFollowersApi(page = 1) {
    const url = `${API_HOST}/leo-tweet-seguidores?pagina=${page}`

    const parans = {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer${getTokenApi()}`
        }
    }

    return fetch( url, parans )
        .then(response => {
            return response.json()
        })
        .catch(err => {
            return err
        })

}