import React, {Component} from "react"
import Filter from "../../regulars/Filter/Filter"
import Results from "../Results/Results"
import Backdrop from "../../UI/Backdrop/Backdrop"
import ProfileScreen from "../../regulars/ProfileScreen/ProfileScreen"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"
import "./Search.css"
import * as _ from "lodash"

// REDUX
import {connect} from "react-redux"
import {store} from "../../../App"

class Search extends Component {
	state = {
		loading: false,
		showProfileScreen: null,
		filters: {
			gender: "any",
			mainLang: "any",
			isEnglish: true,
			ageFrom: "18",
			ageTo: "65"
		},
		resultsFromDB: [],
		filteredResults: []
	}

	componentDidMount() {
		this.setState({loading: true})
		const resultsFromDB = []
		ServerLogic.searchBuddies(store.getState().userInfo.id)
			.then(response => {
				response.data.forEach(user => {
					resultsFromDB.push({
						id: user._id,
						name: user.name,
						gender: user.gender,
						age: user.age,
						country: user.residence,
						imageUrl: user.imageUrl,
						about: user.about,
						language: {...user.language}
					})
				})
				// TODO: make sure duplicated dont return from db instead of using lodash uniqBy
				this.setState({resultsFromDB: [..._.uniqBy(resultsFromDB, "id")]})
				this.applyFilters()
			})
			.catch(err => console.log(err))
	}

	handleFilterChange = (filter, newValue) => {
		const newFiltersObj = {...this.state.filters}
		// todo: fix bug here that when you mark as NOT the nchange to english then back to other language it marks as YES
		if (filter === "mainLang" && newValue === "english") {
			newFiltersObj["isEnglish"] = true
		}
		newFiltersObj[filter] = newValue
		this.setState({filters: {...newFiltersObj}}, function() {
			this.applyFilters()
		})
	}

	applyFilters = () => {
		console.log(this.state.filters)
		const filteredResults = this.state.resultsFromDB.filter(result => {
			console.log(result.language.speaksEnglish)
			console.log(this.state.filters.isEnglish)
			if (
				(result.gender === this.state.filters.gender || this.state.filters.gender === "any") &&
				+result.age > +this.state.filters.ageFrom &&
				+result.age < +this.state.filters.ageTo &&
				(result.language.mainLang === this.state.filters.mainLang || this.state.filters.gender === "any") &&
				!result.language.speaksEnglish === !this.state.filters.isEnglish
			) {
				return true
			}
		})
		this.setState({filteredResults: [...filteredResults], loading: false})
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
				{this.state.loading ? (
					<div class='lds-ripple'>
						<div />
						<div />
					</div>
				) : (
					<Results resultsToShow={this.state.filteredResults} moreInfoClickHandler={this.setProfileScreenToShow} />
				)}
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
