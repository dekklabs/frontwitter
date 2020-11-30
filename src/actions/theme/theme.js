import {types} from '../../types/types'

export const changeTheme = (theme) => {
    return (dispatch) => {
        dispatch(changeThemeType(theme))
    }
}

const changeThemeType = (theme) => ({
    type: types.themeColor,
    payload: {
        theme
    }
})