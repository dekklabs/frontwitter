import { API_HOST } from "../../utils/constant"

export const uploadBanner = (file) => {
    return async (dispatch, getState) => {
        const url = `${API_HOST}/subir-banner`
        const {token} = getState().auth

        const formData = new FormData()
        formData.append("banner", file)

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