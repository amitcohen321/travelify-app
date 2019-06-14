import React from "react"

const EngageButtons = props => {
	return (
		<div data-class='my-extra-content' className='extra content'>
			{props.fbBtn ? (
				<a href={props.fbProfileLink} target='_blank'>
					<i className='facebook icon blue large' />
				</a>
			) : null}
			{props.msgBtn ? (
				<i
					className='envelope icon blue large'
					onClick={() => props.sendMessageClickHandler(props.resultId)}
				/>
			) : null}
			{props.infoBtn ? (
				<i
					className='info circle icon blue large'
					onClick={() => props.moreInfoClickHandler(props.resultId)}
				/>
			) : null}
		</div>
	)
}

export default EngageButtons
