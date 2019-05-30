import React from "react"
import classes from "./ProfileScreen.module.css"
// import withModal from "../../UI/withModal/withModal"

const ProfileScreen = props => {
	return (
		<div>
			<h3>{props.userObj.name}</h3>
			<div className={classes.Avatar}>
				<img src={props.userObj.imageUrl} alt='user-avatar' />
			</div>
			<div>
				<span> Age: {props.userObj.age}</span>
				<span>, From {props.userObj.country} </span>
				<span> {props.userObj.about} </span>
			</div>
			<p>{props.userObj.about}</p>
			<div className={classes.ButtonsCont}>
				<a href={props.userObj.fbProfileLink} target='_blank'>
					FB Profile
				</a>
				<button type='button'>Message...</button>
			</div>
		</div>
	)
}

export default ProfileScreen
