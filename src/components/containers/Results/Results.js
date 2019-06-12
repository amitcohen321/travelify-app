import React, {useState} from "react"
import "./Results.scss"
import ResultThumbnail from "../../regulars/ResultThumbnail/ResultThumbnail"
import Backdrop from "../../UI/Backdrop/Backdrop"
import ProfileScreen from "../../regulars/ProfileScreen/ProfileScreen"
import WithModal from "../../UI/WithModal/WithModal"
import MessageForm from "../../regulars/MessageForm/MessageForm"

const Results = props => {
	const [showMessageScreen, setShowMessageScreen] = useState(null)
	const [showProfileScreen, setShowProfileScreen] = useState(null)

	const setSendMesssageScreenToShow = userId => {
		const userToSendMessageTo = props.resultsToShow.filter(user => user.id === userId)
		setShowMessageScreen(userToSendMessageTo[0])
	}
	const closeMessageScreen = () => {
		setShowMessageScreen(null)
	}

	const setProfileScreenToShow = userId => {
		const userToShowHisScreen = props.resultsToShow.filter(user => user.id === userId)
		setShowProfileScreen(userToShowHisScreen[0])
	}
	const closeProfileScreen = () => {
		setShowProfileScreen(null)
	}

	const resultsThumbnails = props.resultsToShow.map(result => {
		return (
			<>
				{/* MESSAGE MODAL */}
				{showMessageScreen === null ? null : (
					<>
						<WithModal closeHandler={closeMessageScreen}>
							<MessageForm sender={props.currentUser} recipient={showMessageScreen} />
						</WithModal>
						<Backdrop show='true' closeHandler={closeMessageScreen} />
					</>
				)}

				{/* PROFILE MODAL */}
				{showProfileScreen === null ? null : (
					<>
						<WithModal closeHandler={closeProfileScreen}>
							<ProfileScreen userObj={showProfileScreen} />
						</WithModal>
						<Backdrop show='true' closeHandler={closeProfileScreen} />
					</>
				)}

				<ResultThumbnail
					key={result.id}
					result={result}
					moreInfoClickHandler={setProfileScreenToShow}
					sendMessageClickHandler={setSendMesssageScreenToShow}
				/>
			</>
		)
	})

	return (
		<div className='ResultsCont'>
			{props.resultsToShow.length > 0 ? (
				resultsThumbnails
			) : (
				<div>
					<h3>No results 🤷‍</h3>
					<span>Try changing the filters</span>
				</div>
			)}
		</div>
	)
}

export default Results
