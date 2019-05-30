import React from "react"
import classes from "./WithModal.module.css"

const withModal = props => {
	console.log(props)
	return (
		<div className={classes.Modal}>
			<span className={classes.xIcon} onClick={props.closeHandler}>
				X
			</span>
			{props.children}
		</div>
	)
}

export default withModal
