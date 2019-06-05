import React from "react"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom"
import logo from "../../../assets/travelify-logo.png"
import NavBar from "../NavBar/NavBar"

const Header = props => {
	return (
		<div className={classes.Header}>
			<div className={classes.Logo}>
				<img src={logo} alt='travelify-logo' />
			</div>
			<NavBar />
		</div>
	)
}

export default Header
