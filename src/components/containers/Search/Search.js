import React, {Component} from "react"
import Filter from "../../regulars/Filter/Filter"
import Results from "../Results/Results"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"
import "./Search.css"
import * as _ from "lodash"
import Loader from "../../UI/Loader/Loader"

// REDUX
import {connect} from "react-redux"
import {store} from "../../../App"

class Search extends Component {
	state = {
		loading: false,
		showProfileScreen: null,
		showMessageScreen: null,
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
						email: user.email,
						gender: user.gender,
						age: user.age,
						residence: user.residence,
						imageUrl: user.imageUrl,
						about: user.about,
						language: {...user.language},
						fbProfileLink: user.fbProfileLink
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
		// todo: fix bug here that when you mark as NOT then change to english then back to other language it marks as YES
		if (filter === "mainLang" && newValue === "english") {
			newFiltersObj["isEnglish"] = true
		}
		newFiltersObj[filter] = newValue
		this.setState({filters: {...newFiltersObj}}, function() {
			this.applyFilters()
		})
	}

	applyFilters = () => {
		console.log("results from db", this.state.resultsFromDB)
		// todo: Have the isEnglish thing a boolean all the time
		const filteredResults = this.state.resultsFromDB.filter(result => {
			const asBool = result.language.speaksEnglish === "true" // conver str bool to actual bool
			if (
				(result.gender === this.state.filters.gender || this.state.filters.gender === "any") &&
				+result.age > +this.state.filters.ageFrom &&
				+result.age < +this.state.filters.ageTo &&
				(result.language.mainLang === this.state.filters.mainLang ||
					this.state.filters.mainLang === "any") &&
				((this.state.filters.isEnglish && asBool) || !this.state.filters.isEnglish)
			) {
				return true
			}
		})
		console.log("filtered results:", filteredResults)
		this.setState({filteredResults: [...filteredResults], loading: false})
	}

	render() {
		return (
			<>
				<Filter filters={this.state.filters} handleFilterChange={this.handleFilterChange} />
				<div>
					{this.state.loading ? (
						<Loader />
					) : (
						<Results
							currentUser={this.props.currentUser}
							resultsToShow={this.state.filteredResults}
						/>
					)}
				</div>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		destinations: state.destinations,
		currentUser: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)
