import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import { authReducer } from "./authReducer.js";
import { uiReducer } from "./uiReducer.js";
import { userReducer } from "./userReducer.js";
import { followReducer } from "./followReducer";
import { tweetReducer } from "./tweetReducer.js";
import { usersReducer } from "./usersReducer.js";
import { themeReducer } from "./themeReducer.js";

const persistConfig = {
    key : 'root',
    storage,
    whitelist: ['auth', 'ui', 'user', 'follow', 'tweet', 'users', 'theme']
}

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    follow: followReducer,
    tweet: tweetReducer,
    users: usersReducer,
    theme: themeReducer
})

export default persistReducer(persistConfig, rootReducer);