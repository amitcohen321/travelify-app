import React from "react"
import classes from "./Button.module.css"

const Button = props => {
	let btn

	if (props.type === "apply") {
		btn = (
			<button
				className='ui inverted violet button'
				data-class='my-btn'
				onClick={props.btnAction}>
				{props.children}
			</button>
		)
	} else if (props.type === "add") {
		btn = <i className='plus circle icon big violet' data-class='my-btn' onClick={props.btnAction} />
	}

	return <div>{btn}</div>
}

export default Button
