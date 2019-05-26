import React from "react"
import classes from "./Filter.module.css"

const Filter = props => {
	return (
		<div className={classes.FilterCont}>
			<div>
				<label htmlFor='gender'>Gender</label>
				<select value={props.filters.gender} id='gender' onChange={event => props.handleFilterChange("gender", event.target.value)}>
					<option value='any'>Any</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>
			</div>

			<div>
				<label htmlFor='mainLang'>Main Language</label>
				<select id='mainLang' value={props.filters.mainLang} onChange={event => props.handleFilterChange("mainLang", event.target.value)}>
					<option value='any'>Any</option>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='german'>German</option>
					<option value='hebrew'>Hebrew</option>
					<option value='spanish'>Spanish</option>
				</select>

				{props.filters.mainLang === "english" ? null : (
					<div>
						<label htmlFor='speaks_english'>Speaks English?</label>
						{props.filters.isEnglish ? (
							<input
								type='checkbox'
								id='speaks_english'
								checked
								onChange={event => props.handleFilterChange("isEnglish", event.target.checked)}
							/>
						) : (
							<input type='checkbox' id='speaks_english' onChange={event => props.handleFilterChange("isEnglish", event.target.checked)} />
						)}
					</div>
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
