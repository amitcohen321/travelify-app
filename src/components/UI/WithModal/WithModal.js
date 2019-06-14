import React from "react"
import classes from "./WithModal.module.css"

const withModal = props => {
	return (
		<div className={classes.Modal}>
			<span className={classes.xIcon} onClick={props.closeHandler}>
				<i className='window close icon' />
			</span>
			{props.children}
		</div>
	)
}

export default withModal
