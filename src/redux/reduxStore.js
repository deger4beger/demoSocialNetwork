import {createStore, combineReducers, applyMiddleware, compose} from "redux"  
import profileReducer from "./profileReducer"
import messagesReducer from "./messagesReducer"
import navbarReducer from "./navbarReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddleware from "redux-thunk"
import appReducer from "./appReducer"
// import { reducer as formReducer } from "redux-form"

let reducers = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	navbarPage: navbarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store