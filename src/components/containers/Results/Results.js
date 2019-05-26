import React from "react"
import classes from "./Results.module.css"
import ResultThumbnail from "../../regulars/ResultThumbnail/ResultThumbnail"

const Results = props => {
	const resultsThumbnails = props.resultsToShow.map(result => {
		return <ResultThumbnail key={result.id} result={result} moreInfoClickHandler={props.moreInfoClickHandler} />
	})

	return <div className={classes.ResultsCont}>{resultsThumbnails}</div>
}

export default Results
