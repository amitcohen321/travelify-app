import React, {Component} from "react"
import classes from "./MessaegForm.module.css"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"

class MessageForm extends Component {
	state = {
		subjectText: "",
		messageText: "",
		messageSent: false
	}

	textChangeHandler = event => {
		this.setState({messageText: event.target.value})
	}

	subjectChangeHandler = event => {
		this.setState({subjectText: event.target.value})
	}

	submitHandler = event => {
		this.setState({messageText: event.target.value})
	}

	sendEmail = event => {
		console.log(this.props)
		ServerLogic.sendEmail({
			sender: this.props.sender.email,
			senderName: this.props.sender.name.split(" ")[0],
			recipient: this.props.recipient.email,
			message: this.state.messageText,
			subject: this.state.subjectText,
			fbProfileLink: this.props.sender.fbProfileLink
		})
			.then(res => {
				console.log(res)
				this.setState({messageSent: true})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className={classes.FromCont}>
				<p>
					<b>From:</b> {this.props.sender.name}{" "}
				</p>
				<p>
					<b>To:</b> {this.props.recipient.name}
				</p>
				<form className={classes.Form}>
					{/* <label for='subject'>Subject:</label>
					<input
						type='text'
						name='subject'
						required
						maxlength='10'
						size='15'
						value={this.state.subjectText}
						onChange={this.subjectChangeHandler}
					/>
					<br /> */}
					<textarea
						placeholder={`Hey! My name is ${
							this.props.sender.name.split(" ")[0]
						} and I saw we are destined to go to the same place :)`}
						rows='5'
						cols='50'
						required
						value={this.state.messageText}
						onChange={this.textChangeHandler}
					/>
					<br />
					<input type='button' value='Send' onClick={this.sendEmail} />
					{this.state.messageSent ? <span>Message Sent!</span> : null}
				</form>
				<span>*The recipent will also receive a link to your public Facebook profile</span>
			</div>
		)
	}
}

export default MessageForm
