import React from "react"
import classes from "./ResultThumbnail.module.css"

const Result = props => {
	return (
		<div className={classes.ResultThumbnailCont}>
			<div className='ProfileCard'>
				<h3>{props.result.name}</h3>
				<div className={classes.Avatar}>
					<img src={props.result.imageUrl} alt='user-avatar' />
				</div>
				<div>
					<span> Age: {props.result.age}</span>
					<span>, From {props.result.country} </span>
				</div>
				<div className={classes.ButtonsCont}>
					<a href={props.result.fbProfileLink} target='_blank'>
						FB Profile
					</a>
					<button type='button'>Message...</button>
					<button type='button' onClick={() => props.moreInfoClickHandler(props.result.id)}>
						More Info
					</button>
				</div>
			</div>
		</div>
	)
}

export default Result
