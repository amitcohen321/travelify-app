import React, {Component} from "react"
import Filter from "../../regulars/Filter/Filter"
import Results from "../Results/Results"
import Backdrop from "../../UI/Backdrop/Backdrop"
import ProfileScreen from "../../regulars/ProfileScreen/ProfileScreen"

// REDUX
import {connect} from "react-redux"
import * as actionCreators from "../../../store/actionCreators"

class Search extends Component {
	state = {
		showProfileScreen: null,
		filters: {
			gender: "any",
			mainLang: "any",
			englishOnly: false,
			ageFrom: "18",
			ageTo: "65"
		},
		results: [
			{
				id: Math.floor(Math.random() * 1000),
				name: "Amit Cohen",
				age: "29",
				country: "Israel",
				imageUrl:
					"https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.0-9/41660018_10212502444265968_5948577464996331520_n.jpg?_nc_cat=104&_nc_ht=scontent.fsdv1-2.fna&oh=1b2acf4a5e0447aeb906a3e69c35c181&oe=5D5D3691",
				about: "Lorem  laboris nisi ut aliquip ex ea commodo consequat. D laborum"
			},
			{
				id: Math.floor(Math.random() * 1000),
				name: "Ronen Shalom",
				age: "29",
				country: "Israel",
				imageUrl:
					"https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.0-9/41660018_10212502444265968_5948577464996331520_n.jpg?_nc_cat=104&_nc_ht=scontent.fsdv1-2.fna&oh=1b2acf4a5e0447aeb906a3e69c35c181&oe=5D5D3691",
				about: "Lorem  laboris nisi ut aliquip ex ea commodo consequat. D laborum"
			},
			{
				id: Math.floor(Math.random() * 1000),
				name: "Amos Levi",
				age: "29",
				country: "Israel",
				imageUrl:
					"https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.0-9/41660018_10212502444265968_5948577464996331520_n.jpg?_nc_cat=104&_nc_ht=scontent.fsdv1-2.fna&oh=1b2acf4a5e0447aeb906a3e69c35c181&oe=5D5D3691",
				about: "Lorem  laboris nisi ut aliquip ex ea commodo consequat. D laborum"
			}
		]
	}

	//on initial render of component (componentdidmount) fetch all users that match destinations (this.props.destinations)
	//on handleFilterChange, setState with the users that go through the filtering

	componentDidMount() {
		//fetch all users from db that match the current user's itinerary
	}

	handleFilterChange = (filter, newValue) => {
		const newFiltersObj = {...this.state.filters}
		newFiltersObj[filter] = newValue
		this.setState({filters: newFiltersObj})
	}

	applyFilters = () => {
		// initiate on every UI change on filter
	}

	setProfileScreenToShow = userId => {
		const userToShowHisScreen = this.state.results.filter(user => user.id === userId)
		this.setState({showProfileScreen: userToShowHisScreen})
	}
	closeProfileScreen = () => {
		this.setState({showProfileScreen: null})
	}

	render() {
		return (
			<>
				{this.state.showProfileScreen === null ? null : (
					<>
						<ProfileScreen userObj={this.state.showProfileScreen[0]} />
						<Backdrop show='true' clicked={this.closeProfileScreen} />
					</>
				)}
				<Filter filters={this.state.filters} handleFilterChange={this.handleFilterChange} />
				<Results results={this.state.results} moreInfoClickHandler={this.setProfileScreenToShow} />
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		destinations: state.destinations
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)
