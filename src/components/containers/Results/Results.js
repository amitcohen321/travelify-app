import React from "react"
import classes from "./Results.module.css"
import ResultThumbnail from "../../regulars/ResultThumbnail/ResultThumbnail"

const Results = props => {
	const resultsThumbnails = props.resultsToShow.map(result => {
		return <ResultThumbnail key={result.id} result={result} moreInfoClickHandler={props.moreInfoClickHandler} />
	})

	return (
		<div className={classes.ResultsCont}>
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
