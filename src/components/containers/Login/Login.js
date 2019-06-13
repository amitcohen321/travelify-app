import React, {Component} from "react"
import FacebookLogin from "react-facebook-login"
import classes from "./Login.module.css"
import {store} from "../../../App"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"
import logo from "../../../assets/travelify-logo.png"

// REDUX
import {connect} from "react-redux"
import * as actionCreators from "../../../store/actionCreators"

class Login extends Component {
	responseFacebook = FBresponse => {
		const imgUrl = `https://graph.facebook.com/${FBresponse.userID}/picture?type=large`
		FBresponse["picture"]["data"]["url"] = imgUrl

		ServerLogic.getUserByFbUserId(FBresponse.userID)
			.then(res => {
				if (res.data.length === 0) {
					console.log("user doesnt exist")
					this.props.populateStore(FBresponse)
					ServerLogic.createUser(store.getState())
						.then(newUserId => {
							this.props.addUserId(newUserId.data)
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					console.log("user exists")
					this.props.populateStore(res.data[0])
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div className={classes.LoginCont}>
				<div className={classes.Logo}>
					<img src={logo} alt='travelify-logo' />
				</div>
				<div className={classes.FacebookLoginButtonCont}>
					<FacebookLogin
						appId='320090962007782'
						// autoLoad={true}
						scope='user_gender,user_age_range,user_location,user_link,user_birthday'
						fields='name,email,picture,age_range,gender,location,link,birthday'
						callback={this.responseFacebook}
						version='v2.2'
						size='small'
					/>
				</div>
				<span>
					(There's no other way to login
					<span role='img' aria-label='smile-emoji'>
						🙂
					</span>
					)
				</span>
				<p>You will be asked for approval before actually logging in</p>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		preferneces: state.preferneces,
		destinations: state.destinations,
		userInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		populateStore: loginData => {
			dispatch(actionCreators.populateStore(loginData))
		},
		addUserId: userId => {
			dispatch(actionCreators.addUserId(userId))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)
