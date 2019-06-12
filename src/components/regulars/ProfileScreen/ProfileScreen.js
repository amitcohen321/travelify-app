import React from "react"
import classes from "./ProfileScreen.module.css"
// import withModal from "../../UI/withModal/withModal"
import EngageButtons from "../../regulars/EngageButtons/EngageButtons"

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
				<br />
				<br />
				<p> {props.userObj.about} </p>
			</div>
			<br />
			<div className={classes.ButtonsCont}>
				<EngageButtons fbBtn={true} fbProfileLink={props.userObj.fbProfileLink} />
			</div>
		</div>
	)
}

export default ProfileScreen
