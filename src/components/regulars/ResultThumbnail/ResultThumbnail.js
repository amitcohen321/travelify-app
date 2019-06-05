import React from "react"
import "./ResultThumbnail.module.css"

const Result = props => {
	return (
		// <div className={classes.ResultThumbnailCont}>
		<div data-class='my-card' className='ui card my-card'>
			<div class='image'>
				<img src={props.result.imageUrl} />
			</div>
			<div class='content' data-class='my-content'>
				<div class='header'>{props.result.name}</div>
				<div class='description' data-class='my-description'>
					<b>Age:</b> {props.result.age}
					<br />
					<b>From:</b> {props.result.country}
				</div>
			</div>
			<div data-class='my-extra-content' class='extra content'>
				<a href={props.result.fbProfileLink} target='_blank'>
					<i class='facebook icon blue large' />
				</a>
				<i
					class='envelope icon blue large'
					onClick={() => props.sendMessageClickHandler(props.result.id)}
				/>
				<i
					class='info circle icon blue large'
					onClick={() => props.moreInfoClickHandler(props.result.id)}
				/>
			</div>
		</div>
		// </div>
	)
}

export default Result
