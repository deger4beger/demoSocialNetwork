import {authAPI, securityAPI} from "./../api/api"

const SET_USER_DATA = "SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"

let initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	errorMessage: "",
	captchaUrl: null
}

const authReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload
			}	
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.url
			}	
		default:
			return state		
	}
}

export const setAuthUserData = (id, email, login, isAuth, errorMessage, captchaUrl) => ({ type: SET_USER_DATA,
														payload: {id, email, login, isAuth, 
															errorMessage, captchaUrl} })
export const getCaptchaUrlSuccess = (url) => ({ type: GET_CAPTCHA_URL_SUCCESS, url})


export const getMyData = () => async (dispatch) => {
	let data = await authAPI.getMyData()
		if(data.resultCode === 0) {
			let {id, email, login} = data.data
			dispatch(setAuthUserData(id, email, login, true, "", null))
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	let data = await authAPI.login(email, password, rememberMe, captcha)
		if (data.resultCode === 0) {
			dispatch(getMyData())
		} else {
			dispatch(setAuthUserData(null, null, null, false, data.messages, null))
			if (data.resultCode === 10) {
				dispatch(getCaptchaUrl())
			}
			
		}	
}

export const getCaptchaUrl = () => async (dispatch) => {
	let data = await securityAPI.getCaptchaUrl()
	dispatch(getCaptchaUrlSuccess(data.url))
		
}

export const logout = () => async (dispatch) => {
	let data = await authAPI.logout()
		if(data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false, "", null))
	}	
}

export default authReducer