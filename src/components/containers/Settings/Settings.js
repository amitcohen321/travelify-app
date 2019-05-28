import React, {Component} from "react"
import Preferneces from "../../regulars/Preferneces/Preferneces"
import PersonalDetails from "../../regulars/PersonalDetails/PersonalDetails"
import Button from "../../UI/Button/Button"
import classes from "./Settings.module.css"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"
import {store} from "../../../App"

// REDUX
import {connect} from "react-redux"
import * as actionCreators from "../../../store/actionCreators"

class Settings extends Component {
	state = {
		isUserUpdated: false
	}

	updateUserToDatabase = () => {
		ServerLogic.updateUserSettingsOnDb(store.getState())
			.then(res => this.setState({isUserUpdated: true}))
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className={classes.SettingsCont}>
				<PersonalDetails personalDetailsEditHandler={this.props.personalDetailsValueChanged} userInfo={this.props.userInfo} />
				<Preferneces prefernecesEditHandler={this.props.prefernecesValueChanged} preferneces={this.props.preferneces} />
				<Button type='apply' btnAction={this.updateUserToDatabase}>
					Apply
				</Button>
				{this.state.isUserUpdated ? <span role='checkmark-emoji'> Saved! ✅</span> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		preferneces: state.preferneces,
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		prefernecesValueChanged: (prefernecesField, newValue) => {
			dispatch(actionCreators.prefernecesValueChanged(prefernecesField, newValue))
		},
		personalDetailsValueChanged: (personalDetailsField, newValue) => {
			dispatch(actionCreators.personalDetailsValueChanged(personalDetailsField, newValue))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings)
