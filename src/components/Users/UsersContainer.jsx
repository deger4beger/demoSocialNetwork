import {connect} from "react-redux"
import {setCurrentPage,
		requestUsers, follow, unfollow} from "../../redux/usersReducer"
import Users from "./Users"
import React from "react"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {getUsers, getpageSize, getTotalUsersCount,
	getCurrentPage, getIsFetching, getFollowingInProgress} from "../../redux/usersSelectors"

class UsersAPIComponent extends React.Component {

	componentDidMount() {

		this.props.requestUsers(this.props.currentPage, this.props.pageSize,
			this.props.users.length)
	}

	onPageChanged = (pageNumber) => {
		this.props.requestUsers(pageNumber, this.props.pageSize)
	}

	render() {
		console.log("RENDER")
		return <div>
		{this.props.isFetching ? <Preloader /> : null }
		<Users totalUsersCount={this.props.totalUsersCount}
					  pageSize={this.props.pageSize}
					  currentPage={this.props.currentPage}
					  onPageChanged={this.onPageChanged}
					  users={this.props.users}
					  followingInProgress={this.props.followingInProgress}
					  follow={this.props.follow}
					  unfollow={this.props.unfollow} />		
		</div>			  
	}
}

let mapStateToProps = (state) => {
	console.log("mapStateToProps")
	return {		
		users: getUsers(state),
		pageSize: getpageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}


export default compose(
	connect(mapStateToProps, {	
		setCurrentPage,
		requestUsers,
		follow,
		unfollow
	}),
	// withAuthRedirect
)(UsersAPIComponent)


// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		toggleFollow: (userID) => {
// 			dispatch(toggleFollowAC(userID))
// 		},		
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users))
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCountAC(totalCount))
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching))
// 		}
// 	}
// }

