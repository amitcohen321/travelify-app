import React from "react"
import classes from "./Preferneces.module.css"

const Preferneces = props => {
	return (
		<div className={classes.PrefernecesContainer}>
			<h2>Preferneces</h2>
			<div>
				<label for='input_radius'>Radius</label>
				<input
					type='range'
					id='input_radius'
					value={props.preferneces.radius}
					min='1'
					max='30'
					onChange={event => props.prefernecesEditHandler("radius", event.target.value)}
				/>
				<input className={classes.RadiusIndicator} type='text' value={props.preferneces.radius} />
			</div>

			<div>
				<label for='input_discoverable'>Discoverable?</label>

				{/* must render either check checkbox of unchecked because of 'checked' attribute */}
				{/* TODO: consider trying to have it without conditionaly render the input but rather only 1 */}
				{props.preferneces.discoverable ? (
					<input
						type='checkbox'
						id='input_discoverable'
						checked
						onChange={event => props.prefernecesEditHandler("discoverable", event.target.checked)}
					/>
				) : (
					<input
						type='checkbox'
						id='input_discoverable'
						onChange={event => props.prefernecesEditHandler("discoverable", event.target.checked)}
					/>
				)}
			</div>
		</div>
	)
}

export default Preferneces
