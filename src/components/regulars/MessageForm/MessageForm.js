import React, {Component} from "react"
import "./MessaegForm.scss"
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
		ServerLogic.sendEmail({
			sender: this.props.sender.email,
			senderName: this.props.sender.name.split(" ")[0],
			recipient: this.props.recipient.email,
			message: this.state.messageText,
			subject: this.state.subjectText,
			fbProfileLink: this.props.sender.fbProfileLink
		})
			.then(res => {
				this.setState({messageSent: true})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className='FormCont'>
				<p>
					<b>From:</b> {this.props.sender.name}{" "}
				</p>
				<p>
					<b>To:</b> {this.props.recipient.name}
				</p>
				<form className='Form'>
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
					<span>*The recipient will also receive a link to your public Facebook profile</span>
					<br />
					<br />
					<button
						data-class='my-send-btn'
						class='ui primary button my-send-btn'
						onClick={this.sendEmail}>
						Send <i className='arrow alternate circle right icon ' />
					</button>

					{this.state.messageSent ? <span>Message Sent!</span> : null}
				</form>
			</div>
		)
	}
}

export default MessageForm
