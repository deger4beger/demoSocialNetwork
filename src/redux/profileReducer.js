import {profileAPI} from "./../api/api"

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const ERROR_MESSAGE = "ERROR_MESSAGE"

let initialState = {
	posts: [
			{id: 1, message: "Hi, how are you ?", likesCount: 9},
			{id: 2, message: "It's my first post", likesCount: 17},
		],
	profile: null,
	isFetching: false,
	status: "",
	errorMessage: ""
}

const profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [{id: 5,
						message: action.postText,
						likesCount: 0}, ...state.posts]
			}
		case SET_USER_PROFILE: 
			return {...state, profile: action.profile, errorMessage: ""}	
		case TOGGLE_IS_FETCHING: 
			return {...state, isFetching: action.isFetching}
		case SET_STATUS: 
			return {...state, status: action.status}	
		case DELETE_POST:
			return {...state, posts: state.posts.filter( p => p.id != action.postId)}
		case SAVE_PHOTO_SUCCESS:
			return {...state, profile: {...state.profile, photos: action.photos}}
		case ERROR_MESSAGE:
			return {...state, errorMessage: action.errorMessage}									
		default:
			return state		
	}
}

export const addPostActionCreator = (postText) => ({ type: ADD_POST, postText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const setErrorMesssage = (errorMessage) => ({ type: ERROR_MESSAGE, errorMessage })

export const getUserProfile = (userId) => (dispatch) => {
	dispatch(toggleIsFetching(true))
	profileAPI.getUserProfile(userId)
		.then(data => {
			dispatch(setUserProfile(data))
			dispatch(toggleIsFetching(false))
	})

}

export const getStatus = (userId) => (dispatch) => {
	profileAPI.getStatus(userId)
		.then(data => {
			dispatch(setStatus(data))
	})

}

export const updateStatus = (status) => (dispatch) => {
	profileAPI.updateStatus(status)
		.then(data => {
			if(data.resultCode === 0) {
				dispatch(setStatus(status))
			}		
	})
}

export const savePhoto = (file) => async (dispatch) => {
	let data = await profileAPI.savePhoto(file)
		.then(data => {
			if(data.resultCode === 0) {
				dispatch(savePhotoSuccess(data.data.photos))
			}		
	})
}

export const saveProfile = (profile) => async (dispatch, getState) => {
	const id = getState().auth.id
	let data = await profileAPI.saveProfile(profile)
		.then(data => {
			if (data.resultCode === 0) {
				dispatch(getUserProfile(id))
			} else {
				dispatch(setErrorMesssage(data.messages[0]))
				return Promise.reject(data.messages[0])
			}		
	})
}

export default profileReducer