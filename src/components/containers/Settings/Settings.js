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
		isUserUpdated: false,
		fillErrors: []
	}

	updateUserToDatabase = () => {
		ServerLogic.updateUserSettingsOnDb(store.getState())
			.then(res => {
				this.setState({fillErrors: [], isUserUpdated: true})
			})
			.catch(err => {
				const fillErrorsArr = []
				// console.log(err.response.data.error)
				// console.log(err.response)
				// console.log(err.response.data.errors[0].param)
				// console.log(err.response.data.errors[0].msg)
				err.response.data.errors.forEach(errorElement => {
					fillErrorsArr.push({
						field: errorElement.param,
						message: errorElement.msg
					})
				})
				this.setState({fillErrors: [...fillErrorsArr], isUserUpdated: false})
			})
	}

	render() {
		const errorMessages = []
		this.state.fillErrors.forEach(error => {
			errorMessages.push(<span className={classes.ErrorMessage}>{error.message}</span>)
		})

		return (
			<div className={classes.SettingsCont}>
				<PersonalDetails
					personalDetailsEditHandler={this.props.personalDetailsValueChanged}
					userInfo={this.props.userInfo}
					fillErrors={this.state.fillErrors}
				/>
				<hr className={classes.HorizontalShort} />

				<Preferneces
					prefernecesEditHandler={this.props.prefernecesValueChanged}
					preferneces={this.props.preferneces}
					fillErrors={this.state.fillErrors}
				/>

				<hr className={classes.HorizontalLong} />

				<Button type='apply' btnAction={this.updateUserToDatabase}>
					Apply
				</Button>

				{this.state.isUserUpdated ? (
					<span role='checkmark-emoji'> Saved! ✅</span>
				) : (
					<div className={classes.ErrorsCont}>{errorMessages}</div>
				)}
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
