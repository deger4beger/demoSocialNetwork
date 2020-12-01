import s from "./ProfileInfo.module.css"
import React from "react"

class ProfileStatus extends React.Component {

	state = {
		editMode: false,
		status: this.props.status
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
	}

	// setState асинхронен, выполнится после всего остального
	// нужно bind'ить если не стрелочный, а обычный метод, т.к теряется контекст(экспериментальная фича вроде)
	activateEditMode = () => {	
		this.setState({
			editMode: true			
		}) 
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		})
		this.props.updateStatus(this.state.status)   
	}

	onStatusChange = (e) => {
		this.setState({
			status: e.target.value
		})	  
	}

	render() {
		return(
		<div>
			{this.state.editMode ? 		    
			    <div>
			    	<input value={this.state.status} onBlur={this.deactivateEditMode}
			    		 autoFocus={true} onChange={this.onStatusChange}/>
			    </div>
			: 	<div className={s.statusText}>
			    	<span onDoubleClick={ this.activateEditMode }>{this.props.status || "-----"}</span>
			    </div>
		    }
	    </div>	
	    )
    }
}

export default ProfileStatus