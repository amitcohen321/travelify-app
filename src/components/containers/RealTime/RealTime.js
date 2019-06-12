import React, {Component} from "react"
import Results from "../Results/Results"
import axios from "axios"
import openSocket from "socket.io-client"
import consts from "../../../consts"
import classes from "./RealTime.module.css"
import Loader from "../../UI/Loader/Loader"

// REDUX
import {connect} from "react-redux"

class RealTime extends Component {
	state = {
		loading: true,
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
					this.setState({loading: false, usersToShow: [...users]})
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
					},${position.coords.longitude}&key=${consts.GOOGLE_MAPS_API_KEY}`
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
		// notify all users that im leaving through the server
		axios.post("http://localhost:4000/realtime/user-left", this.state.userWithLocation)
		this.socket.close()
	}

	render() {
		return (
			<div className='RealTimeCont'>
				{this.state.isGeolocationAvailable ? null : (
					<h3> geolocation is NOT available on your device :/</h3>
				)}
				{this.state.isGeolocationEnabled ? null : (
					<h3> geolocation is NOT enabled, please Approve once asked by the browser </h3>
				)}
				{this.state.isGeolocationAvailable && this.state.isGeolocationEnabled ? (
					<>
						<div className={classes.RealTimeTop}>
							<h1>Real Time buddies finder</h1>
							<p> You are now discoverable until you leave this page </p>{" "}
							<p>The people currenty in your location are presented here.</p>
							<p> Don't hesitate to check them out and message them if you feel like!</p>
						</div>

						{this.state.loading ? (
							<Loader />
						) : (
							<Results
								resultsToShow={this.state.usersToShow}
								// moreInfoClickHandler={this.setProfileScreenToShow}
								// sendMessageClickHandler={this.setSendMesssageScreenToShow}
							/>
						)}
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
