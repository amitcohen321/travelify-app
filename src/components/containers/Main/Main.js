import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import NavBar from "../../regulars/NavBar/NavBar"
import Search from "../Search/Search"
import Itinerary from "../Itinerary/Itinerary"
import RealTime from "../RealTime/RealTime"
import Settings from "../Settings/Settings"
import Login from "../Login/Login"

// REDUX
import {connect} from "react-redux"

class Main extends Component {
	render() {
		const routes = this.props.isLoggedIn ? (
			<>
				<NavBar />
				<Switch>
					<Route path='/' exact component={Search} />
					<Route path='/search' exact component={Search} />
					<Route path='/itinerary' exact component={Itinerary} />
					<Route path='/realtime' exact component={RealTime} />
					<Route path='/settings' exact component={Settings} />
				</Switch>
			</>
		) : (
			<Login />
		)

		return <>{routes}</>
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.loginInfo.isLoggedIn
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// checkAuthStatus: () => dispatch(actionCreators.checkAuthStatus())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)
