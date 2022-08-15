import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({userReducer});
// adding other reducers is possible by combining them with combineReducers

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);
export const persistor = persistStore(store);

// research: 
// https://blog.logrocket.com/use-redux-persist-react-native/
// https://codesource.io/fix-actions-must-be-plain-objects-use-custom-middleware-for-async-actions/