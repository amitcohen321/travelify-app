import React from "react"
import "./Filter.scss"

const Filter = props => {
	return (
		<div className='FilterCont'>
			<div className='gender-cont'>
				<label for='gender'> Gender </label>
				<select
					value={props.filters.gender ? props.filters.gender : "Select Gender..."}
					id='gender'
					onChange={event => props.handleFilterChange("gender", event.target.value)}
					className='ui dropdown'>
					<option>Select Gender...</option>
					<option value='any'>Any</option>
					<option value='male'>Male 👨</option>
					<option value='female'>Female 👩</option>
				</select>
			</div>

			<div className='input-cont'>
				<label>Main Language</label>
				<select
					id='mainLang'
					value={props.filters.mainLang}
					className='ui dropdown'
					onChange={event => props.handleFilterChange("mainLang", event.target.value)}>
					<option value='any'>Any</option>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='german'>German</option>
					<option value='hebrew'>Hebrew</option>
					<option value='spanish'>Spanish</option>
				</select>

				{props.filters.mainLang === "english" ? null : (
					<div>
						<span htmlFor='speaks_english'>Have to speak English?</span>
						{props.filters.isEnglish ? (
							<input
								type='checkbox'
								id='speaks_english'
								checked
								onChange={event =>
									props.handleFilterChange("isEnglish", event.target.checked)
								}
							/>
						) : (
							<input
								type='checkbox'
								id='speaks_english'
								onChange={event =>
									props.handleFilterChange("isEnglish", event.target.checked)
								}
							/>
						)}
					</div>
				)}
			</div>

			<div className='age-cont'>
				<span htmlFor='age'>
					<b>Age:</b>
				</span>
				<br />
				<label htmlFor='ageFrom' className='filter-label'>
					From
				</label>
				<input
					type='range'
					id='ageFrom'
					value={props.filters.ageFrom}
					min='18'
					max='65'
					onChange={event => props.handleFilterChange("ageFrom", event.target.value)}
				/>
				<input className='AgeFromIndicator' type='text' value={props.filters.ageFrom} />
				<br />
				<label htmlFor='ageTo' className='filter-label'>
					To
				</label>
				<input
					type='range'
					id='ageTo'
					value={props.filters.ageTo}
					min='18'
					max='65'
					onChange={event => props.handleFilterChange("ageTo", event.target.value)}
				/>
				<input className='AgeFromIndicator' type='text' value={props.filters.ageTo} />
			</div>
		</div>
	)
}

export default Filter
