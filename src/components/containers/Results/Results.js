import React from "react"
import "./Results.scss"
import ResultThumbnail from "../../regulars/ResultThumbnail/ResultThumbnail"

const Results = props => {
	const resultsThumbnails = props.resultsToShow.map(result => {
		return (
			<ResultThumbnail
				key={result.id}
				result={result}
				moreInfoClickHandler={props.moreInfoClickHandler}
				sendMessageClickHandler={props.sendMessageClickHandler}
			/>
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
