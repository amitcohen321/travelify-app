import React from "react"
import classes from "./NavBar.module.css"
import {NavLink} from "react-router-dom"
import logo from "../../../assets/travelify-logo.png"

const NavBar = props => {
	return (
		<div className={classes.NavBar}>
			<div className={classes.Logo}>
				<img src={logo} alt='travelify-logo' />
			</div>
			<ul>
				<li>
					<NavLink to='/search'>Search</NavLink>
				</li>
				<li>
					<NavLink to='/itinerary'>Itinerary</NavLink>
				</li>
				<li>
					<NavLink to='/realtime'>Real-Time</NavLink>
				</li>
				<li>
					<NavLink to='/settings'>Settings</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default NavBar
