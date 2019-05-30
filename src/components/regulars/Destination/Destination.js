import React from "react"
import classes from "./Destination.module.css"
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput"

const Destination = props => {
	return (
		<>
			<div className={classes.DestinationCont}>
				<div className={classes.deleteDestBtn} onClick={() => props.removeHandler(props.id)}>
					REMOVE
				</div>
				<input
					type='date'
					name='startdate'
					value={props.startDate}
					onChange={event => props.destEditHandler(props.id, "startDate", event.target.value)}
				/>
				<span>-</span>
				<input
					type='date'
					name='enddate'
					value={props.endDate}
					onChange={event => props.destEditHandler(props.id, "endDate", event.target.value)}
				/>

				<LocationSearchInput locationName={props.location.name} id={props.id} destEditHandler={props.destEditHandler} />
			</div>
		</>
	)
}

export default Destination
