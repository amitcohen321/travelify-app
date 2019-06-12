import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import Header from "../../regulars/Header/Header"
import Footer from "../../regulars/Footer/Footer"
import Search from "../Search/Search"
import Itinerary from "../Itinerary/Itinerary"
import RealTime from "../RealTime/RealTime"
import Settings from "../Settings/Settings"
import Login from "../Login/Login"
import "./main.scss"

// REDUX
import {connect} from "react-redux"

class Main extends Component {
	render() {
		const routes = this.props.isLoggedIn ? (
			<>
				<Header />
				<Switch>
					<Route path='/' exact component={Search} />
					<Route path='/search' exact component={Search} />
					<Route path='/realtime' exact component={RealTime} />
					<Route path='/itinerary' exact component={Itinerary} />
					<Route path='/settings' exact component={Settings} />
				</Switch>
				<Footer />
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
