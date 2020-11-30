import { logOutType } from "./auth"
import { cleanFollow } from "./follow/cleanFollow"
import { cleanTweet } from "./tweet/cleanTweet"
import { userClear } from "./user"
import { usersClean } from "./users/usersClean"

export const logOut = () => {
    return (dispatch) => {
        dispatch(userClear())
        dispatch(logOutType())
        dispatch(cleanTweet())
        dispatch(cleanFollow())
        dispatch(usersClean())
    }
}