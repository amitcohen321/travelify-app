import React from "react"
import "./Destination.scss"
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput"

const Destination = props => {
	return (
		<>
			<div className='DestinationCont'>
				<i className='trash icon red large' onClick={() => props.removeHandler(props.id)} />
				<div className='ui input focus my-date-input'>
					<input
						type='date'
						name='startdate'
						value={props.startDate}
						onChange={event =>
							props.destEditHandler(props.id, "startDate", event.target.value)
						}
					/>
				</div>

				<div className='ui input focus my-date-input'>
					<input
						type='date'
						name='enddate'
						value={props.endDate}
						onChange={event => props.destEditHandler(props.id, "endDate", event.target.value)}
					/>
				</div>

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
