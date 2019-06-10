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
	state = {
		isItineraryUpdated: false
	}

	componentDidMount() {
		// this.props.onItineraryInit()
	}

	updateUserToDatabase = () => {
		ServerLogic.updateUserItineraryOnDb(store.getState())
			.then(res => this.setState({isItineraryUpdated: true}))
			.catch(err => console.log(err))
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
			<div>
				<div className={classes.ItineraryCont}>
					<h1>Define Itinerary</h1>
					<p>
						{" "}
						Define you trip's itinerary and Travelify will help you find people that meet you
						on the road
					</p>
					<div className={classes.DestinationsCont}>
						{destinationsCollection.length > 0 ? (
							destinationsCollection
						) : (
							<h3>Start by adding destinations...</h3>
						)}
					</div>
					<Button type='add' btnAction={this.props.destinationAdded}>
						<i class='plus circle icon' />
					</Button>

					<hr className={classes.HorizontalLong} />

					<Button type='apply' btnAction={this.updateUserToDatabase}>
						Apply
					</Button>
				</div>

				{this.state.isItineraryUpdated ? <span role='checkmark'>Saved! ✅</span> : null}
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
