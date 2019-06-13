import React from "react"
import "./ResultThumbnail.scss"
import EngageButtons from "../EngageButtons/EngageButtons"

const ResultThumbnail = props => {
	return (
		<div data-class='my-card' className='ui card my-card'>
			<div class='image'>
				<img src={props.result.imageUrl} />
			</div>
			<div class='content' data-class='my-content'>
				<div class='header'>{props.result.name}</div>
				<div class='description' data-class='my-description'>
					<b>Age:</b> {props.result.age}
					<br />
					<b>From:</b> {props.result.residence}
				</div>
			</div>
			<EngageButtons
				fbBtn={true}
				fbProfileLink={props.result.fbProfileLink}
				msgBtn={true}
				resultId={props.result.id}
				sendMessageClickHandler={props.sendMessageClickHandler}
				infoBtn={true}
				moreInfoClickHandler={props.moreInfoClickHandler}
			/>
		</div>
	)
}

export default ResultThumbnail
