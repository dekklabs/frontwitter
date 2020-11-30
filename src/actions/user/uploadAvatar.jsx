import { API_HOST } from "../../utils/constant"

export const uploadAvatar = (file) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/subir-avatar`
        const {token} = getState().auth

        const formData = new FormData()
        formData.append("avatar", file)

        const parans = {
            method: "POST",
            headers: {
                "Authorization" : `Bearer${token}`
            },
            body: formData
        }

        await fetch(url, parans)
    }
}