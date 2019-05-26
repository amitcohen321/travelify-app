import classes from "./Itinerary.module.css"
import Destination from "../../regulars/Destination/Destination"
import React, {Component} from "react"
import Button from "../../UI/Button/Button"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"

// REDUX
import {connect} from "react-redux"
import {store} from "../../../App"
import * as actionCreators from "../../../store/actionCreators"

class Itinerary extends Component {
	state = {}

	componentDidMount() {
		// this.props.onItineraryInit()
	}

	updateUserToDatabase() {
		console.log("hi amit")
		ServerLogic.updateUserItineraryOnDb(store.getState())
	}

	render() {
		const destinationsCollection = this.props.destinations.map(destination => {
			return (
				<Destination
					key={destination.id}
					id={destination.id}
					startDate={destination.startDate}
					endDate={destination.endDate}
					location={destination.location}
					removeHandler={this.props.destinationRemove}
					destEditHandler={this.props.destinationValueChanged}
				/>
			)
		})

		return (
			<div className={classes.ItineraryCont}>
				<h1>Define Itinerary</h1>
				<p> Define you trip's itinerary and Travelify will help you find people to travel with </p>
				<div className={classes.DestinationsCont}>{destinationsCollection}</div>
				<Button type='add' btnAction={this.props.destinationAdded}>
					+
				</Button>
				<Button type='apply' btnAction={this.updateUserToDatabase}>
					Apply
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		destinations: state.destinations
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onItineraryInit: () => {
			dispatch(actionCreators.getDestinationsStart())
		},

		// NOT DONE YET (updateItinerary) - should send data to db
		updateItinerary: () => {
			dispatch(actionCreators.updateItinerary())
		},
		destinationAdded: () => {
			dispatch(actionCreators.destinationAdded())
		},
		destinationRemove: idToRemove => {
			dispatch(actionCreators.destinationRemove(idToRemove))
		},
		destinationValueChanged: (destId, field, newValue) => {
			dispatch(actionCreators.destinationValueChanged(destId, field, newValue))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Itinerary)
