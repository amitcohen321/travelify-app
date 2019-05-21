import axios from "axios"

export const createUser = storeState => {
	let user = {
		// build user object to send to db
		userInfo: {...storeState.userInfo, language: {...storeState.userInfo.language}},
		preferneces: {...storeState.preferneces},
		destinations: [...storeState.destinations],
		loginInfo: {...storeState.loginInfo}
	}

	return axios.post("http://localhost:4000/create-user", user)
}

export const getUserByFbUserId = fbUserId => {
	return axios.get("http://localhost:4000/get-user/fbid/" + fbUserId)
}
