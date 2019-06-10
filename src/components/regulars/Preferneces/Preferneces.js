import React from "react"
import classes from "./Preferneces.module.css"
import * as utils from "../../Utils/utils"

const Preferneces = props => {
	return (
		<div className={classes.PrefernecesCont}>
			<h2>Preferneces</h2>
			<div className={classes.InputsCont}>
				<label htmlFor='input_radius'>
					Radius <sub>(for Real-Time only)</sub>
				</label>
				<input
					className={
						utils.isObjInArrByAttr(props.fillErrors, "preferneces.radius")
							? classes.Error
							: ""
					}
					type='range'
					id='input_radius'
					value={props.preferneces.radius}
					min='1'
					max='30'
					onChange={event => props.prefernecesEditHandler("radius", event.target.value)}
				/>
				<input
					className={classes.RadiusIndicator}
					type='text'
					value={props.preferneces.radius}
				/>

				<div>
					<label htmlFor='input_discoverable'>Discoverable?</label>

					{/* TODO: consider trying to have it without conditionaly render the input but rather only 1 */}
					{props.preferneces.discoverable ? (
						<input
							type='checkbox'
							id='input_discoverable'
							checked
							onChange={event =>
								props.prefernecesEditHandler("discoverable", event.target.checked)
							}
						/>
					) : (
						<input
							type='checkbox'
							id='input_discoverable'
							onChange={event =>
								props.prefernecesEditHandler("discoverable", event.target.checked)
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Preferneces
