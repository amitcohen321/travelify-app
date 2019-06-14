import React, {Component} from "react"
import {Menu} from "semantic-ui-react"
import {NavLink} from "react-router-dom"

export default class NavBar extends Component {
	state = {activeItem: "abcd"}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})
	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (
			<Menu color='violet' inverted widths={4}>
				<Menu.Item
					as={NavLink}
					to='/search'
					name='🔍 Search'
					active={activeItem === "search"}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					as={NavLink}
					to='/realtime'
					name='⏱️ Real-Time'
					active={activeItem === "realtime"}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					as={NavLink}
					to='/itinerary'
					name='🗺️ Itinerary'
					active={activeItem === "itinerary"}
					onClick={this.handleItemClick}
				/>
				<Menu.Item
					as={NavLink}
					to='/settings'
					name='⚙️ Settings'
					active={activeItem === "settings"}
					onClick={this.handleItemClick}
				/>
			</Menu>
		)
	}
}
