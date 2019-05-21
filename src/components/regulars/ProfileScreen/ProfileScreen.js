import React from "react"
import classes from "./ProfileScreen.module.css"

const ProfileScreen = props => {
	console.log(props)
	return (
		<div className={classes.ProfileScreen}>
			<h3>{props.userObj.name}</h3>
			<div className={classes.Avatar}>
				<img src={props.userObj.imageUrl} />
			</div>
			<div>
				<span> Age: {props.userObj.age}</span>
				<span>, From {props.userObj.country} </span>
			</div>
			<p>{props.userObj.about}</p>
			<div className={classes.ButtonsCont}>
				<button type='button'>FB Profile</button>
				<button type='button'>Message...</button>
			</div>
		</div>
	)
}

export default ProfileScreen
