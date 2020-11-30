import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reduce/rootReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

const persistor = persistStore(store);

export { store, persistor };