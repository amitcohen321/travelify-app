import React, {Component} from "react"
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete"
import "./LocationSearchInput.scss"

class LocationSearchInput extends Component {
	constructor(props) {
		super(props)
		this.state = {address: ""}
	}

	handleChange = (address, location) => {
		this.setState({address: address})
	}

	handleSelect = address => {
		const location = {
			name: "",
			placeId: "",
			lat: null,
			lng: null
		}
		geocodeByAddress(address)
			.then(results => {
				location["name"] = results[0].formatted_address
				location["placeId"] = results[0].place_id
				getLatLng(results[0]).then(latLng => {
					location["lat"] = latLng.lat
					location["lng"] = latLng.lng
					this.handleChange(location["name"], location)
					this.props.destEditHandler(this.props.id, "location", location)
				})
			})
			.catch(error => console.error("Error", error))
	}

	render() {
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}>
				{({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
					<div class='ui input focus my-dest-input'>
						<input
							{...getInputProps({
								placeholder: this.props.locationName,
								className: "location-search-input"
							})}
						/>
						<div className='autocomplete-dropdown-container'>
							{/* {loading && <div>Loading...</div>} */}
							{suggestions.map(suggestion => {
								const className = suggestion.active
									? "suggestion-item--active"
									: "suggestion-item"
								// inline style for demonstration purpose
								const style = suggestion.active
									? {backgroundColor: "#fafafa", cursor: "pointer"}
									: {backgroundColor: "#ffffff", cursor: "pointer"}

								return (
									<div {...getSuggestionItemProps(suggestion, {className, style})}>
										<span>{suggestion.description}</span>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		)
	}
}

export default LocationSearchInput
