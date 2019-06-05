import React from "react"
import classes from "./Destination.module.css"
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput"

const Destination = props => {
	return (
		<>
			<div className={classes.DestinationCont}>
				<i class='trash icon red large' onClick={() => props.removeHandler(props.id)} />
				<div class='ui input focus'>
					<input
						type='date'
						name='startdate'
						value={props.startDate}
						onChange={event =>
							props.destEditHandler(props.id, "startDate", event.target.value)
						}
					/>
				</div>
				<span> - </span>
				<div class='ui input focus'>
					<input
						type='date'
						name='enddate'
						value={props.endDate}
						onChange={event => props.destEditHandler(props.id, "endDate", event.target.value)}
					/>
				</div>
				<span> > </span>
				<LocationSearchInput
					locationName={props.location.name}
					id={props.id}
					destEditHandler={props.destEditHandler}
				/>
			</div>
		</>
	)
}

export default Destination
