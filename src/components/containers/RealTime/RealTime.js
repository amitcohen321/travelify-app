import React, {Component} from "react"
import Results from "../Results/Results"
import axios from "axios"
import openSocket from "socket.io-client"

// REDUX
import {connect} from "react-redux"

class RealTime extends Component {
	state = {
		usersToShow: [],
		userWithLocation: null,
		isGeolocationAvailable: navigator.geolocation,
		isGeolocationEnabled: false
	}

	componentDidMount() {
		const users = []

		this.socket = openSocket("http://localhost:4000")
		this.socket.on("user_joined", connectedUsers => {
			connectedUsers.forEach(user => {
				if (user.location === this.state.userWithLocation.location) {
					users.push(this.state.userWithLocation.user)
					this.setState({usersToShow: [...users]})
				}
			})
		})

		this.socket.on("user_left", connectedUsers => {
			connectedUsers.forEach(user => {
				if (user.location === this.state.userWithLocation.location) {
					users.push(user)
				}
			})
			this.setState({usersToShow: [...users]})
		})

		navigator.geolocation.getCurrentPosition(position => {
			this.setState({isGeolocationEnabled: true})
			axios
				.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
						position.coords.latitude
					},${position.coords.longitude}&key=AIzaSyB7eI-YGiO4YLpdtmjpbAtemZC2BjnWb34`
				)
				.then(res => {
					let compoundCode = res.data.plus_code.compound_code
					let placeName = compoundCode.substr(compoundCode.indexOf(" ") + 1)
					this.setState({currentUserLocation: placeName})
					const userWithLocation = {
						user: {...this.props.currentUser},
						location: placeName
					}
					this.setState({userWithLocation: {...userWithLocation}})
					axios.post("http://localhost:4000/realtime/user-joined", userWithLocation)
				})
				.catch(err => {
					console.log(err)
				})
		})
	}

	componentWillUnmount() {
		// notify all users that im leaving
		axios.post("http://localhost:4000/realtime/user-left", this.state.userWithLocation)
		this.socket.close()
	}

	render() {
		return (
			<div className='RealTimeCont'>
				{this.state.isGeolocationAvailable ? (
					<h3> geolocation is available on your device</h3>
				) : (
					<h3> geolocation is NOT available on your device :/</h3>
				)}
				{this.state.isGeolocationEnabled ? (
					<h3> geolocation is enabled </h3>
				) : (
					<h3> geolocation is NOT enabled, please Approve </h3>
				)}
				{this.state.isGeolocationAvailable && this.state.isGeolocationEnabled ? (
					<>
						<h2>You are now discoverable until you leave this page</h2>
						<h2>Here are the people currently in your location</h2>
						<h2>Don't hesitate to check them out and message them if you feel like!</h2>
						<Results
							resultsToShow={this.state.usersToShow}
							// moreInfoClickHandler={this.setProfileScreenToShow}
							// sendMessageClickHandler={this.setSendMesssageScreenToShow}
						/>
					</>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RealTime)
