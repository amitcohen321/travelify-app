import React, {Component} from "react"
import Filter from "../../regulars/Filter/Filter"
import Results from "../Results/Results"
import Backdrop from "../../UI/Backdrop/Backdrop"
import ProfileScreen from "../../regulars/ProfileScreen/ProfileScreen"
import * as ServerLogic from "../../Utils/ServerLogic/ServerLogic"
import "./Search.css"
import * as _ from "lodash"
import WithModal from "../../UI/WithModal/WithModal"
import Loader from "../../UI/Loader/Loader"
import MessageForm from "../../regulars/MessageForm/MessageForm"

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
						country: user.residence,
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
		this.setState({filteredResults: [...filteredResults], loading: false})
	}

	setProfileScreenToShow = userId => {
		const userToShowHisScreen = this.state.resultsFromDB.filter(user => user.id === userId)
		this.setState({showProfileScreen: userToShowHisScreen})
	}

	closeProfileScreen = () => {
		this.setState({showProfileScreen: null})
	}

	setSendMesssageScreenToShow = userId => {
		const userToSendMessageTo = this.state.resultsFromDB.filter(user => user.id === userId)
		this.setState({showMessageScreen: userToSendMessageTo})
	}

	closeMessageScreen = () => {
		this.setState({showMessageScreen: null})
	}

	render() {
		return (
			<>
				{this.state.showMessageScreen === null ? null : (
					<>
						<WithModal closeHandler={this.closeMessageScreen}>
							<MessageForm
								sender={this.props.currentUser}
								recipient={this.state.showMessageScreen[0]}
							/>
						</WithModal>
						<Backdrop show='true' clicked={this.closeProfileScreen} />
					</>
				)}

				{this.state.showProfileScreen === null ? null : (
					<>
						<WithModal closeHandler={this.closeProfileScreen}>
							<ProfileScreen userObj={this.state.showProfileScreen[0]} />
						</WithModal>
						<Backdrop show='true' clicked={this.closeProfileScreen} />
					</>
				)}
				<Filter filters={this.state.filters} handleFilterChange={this.handleFilterChange} />
				{this.state.loading ? (
					<Loader />
				) : (
					<Results
						resultsToShow={this.state.filteredResults}
						moreInfoClickHandler={this.setProfileScreenToShow}
						sendMessageClickHandler={this.setSendMesssageScreenToShow}
					/>
				)}
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
