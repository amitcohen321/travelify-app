import React from "react"
import classes from "./Backdrop.module.css"

const backdrop = props => {
	return props.show === "true" ? (
		<div className={classes.Backdrop} onClick={props.closeHandler} />
	) : null
}

export default backdrop
