import React from "react"
import classes from "./PersonalDetails.module.css"

const PersonalDetails = props => {
	return (
		<div className={classes.PersonalDetailsCont}>
			<h2> Personal Details </h2>
			<h3>{props.userInfo.name}</h3>
			<div className={classes.ImageCont}>
				<img src={props.userInfo.imageUrl} />
			</div>
			<br />
			<div>
				<span>age: {props.userInfo.age}, </span>
				<span>from {props.userInfo.country}</span>
			</div>

			<div className={classes.EmailCont}>
				<span>{props.userInfo.email}</span>
			</div>
			<div>
				<label for='main_language'>Main spoken language</label>
				<select
					value={props.userInfo.language.mainLang}
					id='main_language'
					onChange={event => props.personalDetailsEditHandler("mainLang", event.target.value)}>
					<option value=''>--Please choose an option--</option>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='german'>German</option>
					<option value='hebrew'>Hebrew</option>
					<option value='spanish'>Spanish</option>
				</select>

				<label for='speaks_english'>Speaks English?</label>
				{props.userInfo.language.speaksEnglish === "true" ? (
					<input
						type='checkbox'
						id='speaks_english'
						checked
						onChange={event => props.personalDetailsEditHandler("speaksEnglish", event.target.checked)}
					/>
				) : (
					<input
						type='checkbox'
						id='speaks_english'
						onChange={event => props.personalDetailsEditHandler("speaksEnglish", event.target.checked)}
					/>
				)}
				<div>
					<textarea
						id='about'
						name='about'
						rows='5'
						cols='33'
						onChange={event => props.personalDetailsEditHandler("about", event.target.value)}
						placeholder='Tell us about you...'
						value={props.userInfo.about}
					/>
				</div>
			</div>
		</div>
	)
}

export default PersonalDetails
