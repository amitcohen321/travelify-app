import React from "react"
import classes from "./Footer.module.css"

const Footer = () => {
	return (
		<footer className={classes.Footer}>
			<div>
				<span>
					This app was created with 💗 by Amit Cohen
					<br /> to help sole travelers have more fun
				</span>
			</div>

			<div>
				<span>
					Contact me at:
					<br /> 📧 amit_cohen321@hotmail.com
				</span>
			</div>
		</footer>
	)
}
export default Footer
