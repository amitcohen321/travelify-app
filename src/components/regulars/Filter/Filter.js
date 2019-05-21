import React from "react"
import classes from "./Filter.module.css"

const Filter = props => {
	return (
		<div className={classes.FilterCont}>
			<div>
				<label htmlFor='gender'>Gender</label>
				<select id='gender' onChange={event => props.handleFilterChange("gender", event.target.value)}>
					<option value='any'>Any</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>
			</div>

			<div>
				<label htmlFor='mainLang'>Main Language</label>
				<select id='mainLang' onChange={event => props.handleFilterChange("mainLang", event.target.value)}>
					<option value='any'>Any</option>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='german'>German</option>
					<option value='hebrew'>Hebrew</option>
					<option value='spanish'>Spanish</option>
				</select>

				<label htmlFor='speaks_english'>English speakers only?</label>
				{props.englishOnly ? (
					<input
						type='checkbox'
						id='speaks_english'
						checked
						onChange={event => props.handleFilterChange("englishOnly", event.target.checked)}
					/>
				) : (
					<input
						type='checkbox'
						id='speaks_english'
						onChange={event => props.handleFilterChange("englishOnly", event.target.checked)}
					/>
				)}
			</div>

			<div>
				<span htmlFor='age'>Age:</span>

				<label htmlFor='ageFrom'>From</label>
				<input
					type='range'
					id='ageFrom'
					value={props.filters.ageFrom}
					min='18'
					max='65'
					onChange={event => props.handleFilterChange("ageFrom", event.target.value)}
				/>
				<input className={classes.AgeFromIndicator} type='text' value={props.filters.ageFrom} />

				<label htmlFor='ageTo'>To</label>
				<input
					type='range'
					id='ageTo'
					value={props.filters.ageTo}
					min='18'
					max='65'
					onChange={event => props.handleFilterChange("ageTo", event.target.value)}
				/>
				<input className={classes.AgeFromIndicator} type='text' value={props.filters.ageTo} />
			</div>
		</div>
	)
}

export default Filter
