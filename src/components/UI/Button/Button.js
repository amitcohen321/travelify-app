import React from "react"
import classes from "./Button.module.css"

const Button = props => {
	let btn

	if (props.type === "apply") {
		btn = (
			<button className={[classes.BtnApprove, classes.Btn].join(" ")} onClick={props.btnAction}>
				{props.children}
			</button>
		)
	} else if (props.type === "add") {
		btn = (
			<button className={[classes.AddBtn, classes.Btn].join(" ")} onClick={props.btnAction}>
				{props.children}
			</button>
		)
	}

	return <div>{btn}</div>
}

export default Button
