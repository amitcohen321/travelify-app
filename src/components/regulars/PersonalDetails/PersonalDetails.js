import React from "react"
import classes from "./PersonalDetails.module.css"

const PersonalDetails = props => {
	console.log(props)
	let englishInput = null

	props.userInfo.language.speaksEnglish === "true"
		? (englishInput = (
				<>
					<label htmlFor='speaks_english'>Speaks English?</label>
					<input
						type='checkbox'
						id='speaks_english'
						checked
						onChange={event =>
							props.personalDetailsEditHandler("speaksEnglish", event.target.checked)
						}
					/>
				</>
		  ))
		: (englishInput = (
				<>
					<label for='speaks_english'>Speaks English?</label>
					<input
						type='checkbox'
						id='speaks_english'
						onChange={event =>
							props.personalDetailsEditHandler("speaksEnglish", event.target.checked)
						}
					/>
				</>
		  ))

	return (
		<div className={classes.PersonalDetailsCont}>
			<h2> Personal Details </h2>
			<hr className={classes.HorizontalShort} />
			<h3>{props.userInfo.name}</h3>
			<div className={classes.ImageCont}>
				<img src={props.userInfo.imageUrl} alt='user-avatar' />
			</div>
			<div className={classes.DetailsCont}>
				<p>{props.userInfo.email}</p>
				<p>Age: {props.userInfo.age} </p>
				<p>From: {props.userInfo.residence}</p>
			</div>
			<hr className={classes.HorizontalShort} />

			<div className={classes.InputsCont}>
				<label htmlFor='main_language'>Main spoken language</label>
				<select
					value={props.userInfo.language.mainLang}
					id='main_language'
					onChange={event => props.personalDetailsEditHandler("mainLang", event.target.value)}>
					<option value=''>Choose...</option>
					<option value='english'>English</option>
					<option value='french'>French</option>
					<option value='german'>German</option>
					<option value='hebrew'>Hebrew</option>
					<option value='spanish'>Spanish</option>
				</select>
				<br />
				{props.userInfo.language.mainLang === "english" ? null : englishInput}
				<br />
				<div>
					<textarea
						id='about'
						name='about'
						rows='5'
						cols='33'
						onChange={event => props.personalDetailsEditHandler("about", event.target.value)}
						placeholder='Tell people about you...'
						value={props.userInfo.about}
					/>
				</div>
			</div>
		</div>
	)
}

export default PersonalDetails
