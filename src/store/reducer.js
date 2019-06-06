import * as actionTypes from "./actionTypes"
import * as utils from "../components/Utils/utils"

const initialState = {
	loginInfo: {
		isLoggedIn: false,
		token: "",
		fbUserId: ""
	},
	preferneces: {
		radius: 5,
		discoverable: true
	},
	destinations: [],
	userInfo: {
		id: null,
		name: "",
		about: "",
		age: null,
		email: "",
		fbProfileLink: "",
		gender: "",
		imageUrl: "",
		residence: "",
		language: {
			mainLang: "",
			speaksEnglish: true
		}
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// GET ITINERARY
		case actionTypes.GET_DESTINATIONS_START:
			return {
				...state,
				destinations: []
			}

		case actionTypes.UPDATE_ITINERARY:
			return {
				...state,
				destinations: []
			}

		case actionTypes.DESTINATION_ADDED:
			return {
				...state,
				destinations: [
					...state.destinations,
					{
						// TODO: change id to not be random, change initial values
						id: Math.floor(Math.random() * 1000),
						startDate: new Date(),
						endDate: new Date(),
						location: ""
					}
				]
			}

		case actionTypes.DESTINATION_REMOVE:
			const filteredArr = state.destinations.filter(dest => dest.id !== action.idToRemove)
			return {
				...state,
				destinations: [...filteredArr]
			}

		case actionTypes.DESTINATION_VALUE_CHANGED:
			const editedArr = [...state.destinations]
			const idx = state.destinations.findIndex(destination => {
				return destination.id === action.destId
			})
			editedArr[idx][action.field] = action.newValue
			return {
				...state,
				destinations: [...editedArr]
			}

		case actionTypes.PREFERNECES_VALUE_CHANGED:
			const editedPreferneces = {...state.preferneces}
			if (action.prefernecesField === "radius") {
				action.newValue = +action.newValue
			}
			editedPreferneces[action.prefernecesField] = action.newValue
			return {
				...state,
				preferneces: {...editedPreferneces}
			}

		case actionTypes.ADD_USER_ID:
			const editedUserInfo_au = {...state.userInfo, id: action.userId}
			return {
				...state,
				userInfo: {...editedUserInfo_au}
			}

		// TODO: Need IF here (need to uncomment but it gives an error editedUserLanguage is not defined)
		case actionTypes.PERSONALDETAILS_VALUE_CHANGED:
			const editedUserLanguage = {...state.userInfo.language}
			editedUserLanguage[action.personalDetailsField] = action.newValue
			const newUserInfo = {...state.userInfo}
			if (
				action.personalDetailsField === "mainLang" ||
				action.personalDetailsField === "speaksEnglish"
			) {
				if (action.personalDetailsField === "mainLang" && action.newValue === "english") {
					editedUserLanguage["speaksEnglish"] = "true"
				}
				newUserInfo["language"] = editedUserLanguage
			} else if (action.personalDetailsField === "about") {
				newUserInfo["about"] = action.newValue
			} else if (action.personalDetailsField === "id") {
				newUserInfo["id"] = action.newValue
			}
			return {
				...state,
				userInfo: {...newUserInfo}
			}

		case actionTypes.POPULATE_STORE:
			const editedUserInfo = {...state.userInfo}
			const editedLoginInfo = {...state.loginInfo}
			const editedLanguage = {...state.userInfo.language}
			const editedPreferneces_ps = {...state.preferneces}
			let editedDestinations = [...state.destinations]

			editedUserInfo["name"] = action.loginData.name
			editedUserInfo["email"] = action.loginData.email
			editedUserInfo["gender"] = action.loginData.gender
			editedUserInfo["fbProfileLink"] = action.loginData.fbProfileLink
			editedUserInfo["about"] = action.loginData.about

			if (!action.loginData.picture) {
				console.log("populating store from DB (existing user)")
				editedUserInfo["id"] = action.loginData._id
				editedUserInfo["age"] = action.loginData.age
				editedUserInfo["imageUrl"] = action.loginData.imageUrl
				editedUserInfo["residence"] = action.loginData.residence
				editedLoginInfo["token"] = action.loginData.loginInfo.token
				editedLoginInfo["fbUserId"] = action.loginData.loginInfo.fbUserId
				editedLanguage["mainLang"] = action.loginData.language.mainLang
				editedLanguage["speaksEnglish"] = action.loginData.language.speaksEnglish
				editedPreferneces_ps["discoverable"] = action.loginData.preferneces.discoverable
				editedPreferneces_ps["radius"] = action.loginData.preferneces.radius
				editedDestinations = [...action.loginData.itinerary.destinations]
			} else {
				console.log("populating store from FB data (new user)")
				const age = utils.getAge(action.loginData.birthday)
				editedUserInfo["age"] = age
				editedUserInfo["imageUrl"] = action.loginData.picture.data.url
				editedUserInfo["residence"] = action.loginData.location.name
				editedLoginInfo["token"] = action.loginData.accessToken
				editedLoginInfo["fbUserId"] = action.loginData.userID
			}

			editedLoginInfo["isLoggedIn"] = true

			editedUserInfo["language"] = {...editedLanguage}

			return {
				...state,
				userInfo: {...editedUserInfo},
				loginInfo: {...editedLoginInfo},
				preferneces: {...editedPreferneces_ps},
				destinations: [...editedDestinations]
			}

		default:
			return state
	}
}

export default reducer
