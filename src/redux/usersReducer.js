import {usersAPI, followAPI} from "./../api/api"

const TOGGLE_FOLLOW= "TOGGLE_FOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHGING = "TOGGLE_IS_FETCHGING"
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS"

let initialState = {
	users: [	],
	pageSize: 3,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: []
	// fake: 0
}

const usersReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case TOGGLE_FOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userID) {
						return {...u, followed: !u.followed}
					}
					return u
				})
			}	
		case SET_USERS:
			return { ...state, users: action.users}
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage}	
		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalCount}	
		case TOGGLE_IS_FETCHGING:
			return {...state, isFetching: action.isFetching}
		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {...state,
					followingInProgress: action.isFetching 
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)}
		// case "FAKE":
		// 	return {
		// 		...state,
		// 		fake: state.fake + 1
		// 	}								
		default:
			return state		
	}
}

export const toggleFollow = (userID) => ({ type: TOGGLE_FOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount})
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHGING, isFetching })
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS,
																	isFetching, userId })

export const requestUsers = (currentPage, pageSize, length = 0) => {
	
	return (dispatch) => {

		if (length === 0) {
			dispatch(setCurrentPage(currentPage))
			dispatch(toggleIsFetching(true))
			usersAPI.getUsers(currentPage, pageSize).then(data => {
					dispatch(toggleIsFetching(false))
					dispatch(setUsers(data.items))
					dispatch(setTotalUsersCount(data.totalCount))
		})}
	}	
}

export const follow = (userId) => {
	
	return (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId))
		followAPI.follow(userId)
			.then(data => {
				if (data.resultCode === 0) {
					dispatch(toggleFollow(userId))
				}
				dispatch(toggleIsFollowingProgress(false, userId))
		})
	}	
}

export const unfollow = (userId) => {
	
	return (dispatch) => {
		dispatch(toggleIsFollowingProgress(true, userId))
		followAPI.unfollow(userId)
			.then(data => {
				if (data.resultCode === 0) {
					dispatch(toggleFollow(userId))
				}
				dispatch(toggleIsFollowingProgress(false, userId))
		})
	}	
}


export default usersReducer