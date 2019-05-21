import * as actionTypes from "./actionTypes"
import axios from "axios"

// DESTINATIONS ACTION CREATORS
export const getDestinationsStart = () => {
	return {
		type: actionTypes.GET_DESTINATIONS_START
	}
}

export const destinationAdded = () => {
	return {
		type: actionTypes.DESTINATION_ADDED
	}
}

export const updateItinerary = () => {
	return {
		type: actionTypes.UPDATE_ITINERARY
	}
}

export const destinationRemove = idToRemove => {
	return {
		type: actionTypes.DESTINATION_REMOVE,
		idToRemove: idToRemove
	}
}

export const destinationValueChanged = (destId, field, newValue) => {
	return {
		type: actionTypes.DESTINATION_VALUE_CHANGED,
		destId: destId,
		field: field,
		newValue: newValue
	}
}

export const prefernecesValueChanged = (prefernecesField, newValue) => {
	return {
		type: actionTypes.PREFERNECES_VALUE_CHANGED,
		prefernecesField: prefernecesField,
		newValue: newValue
	}
}

export const personalDetailsValueChanged = (personalDetailsField, newValue) => {
	return {
		type: actionTypes.PERSONALDETAILS_VALUE_CHANGED,
		personalDetailsField: personalDetailsField,
		newValue: newValue
	}
}

export const populateStore = loginData => {
	return {
		type: actionTypes.POPULATE_STORE,
		loginData: loginData
	}
}

export const checkAuthStatus = () => {
	return {
		type: actionTypes.CHECK_AUTH_STATUS
	}
}

export const addUserId = userId => {
	return {
		type: actionTypes.ADD_USER_ID,
		userId: userId
	}
}
