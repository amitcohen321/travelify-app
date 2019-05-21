import React, {Component} from "react"
import "./App.css"
import {BrowserRouter} from "react-router-dom"
import Main from "./components/containers/Main/Main"

//REDUX
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import reducer from "./store/reducer"
import {Provider} from "react-redux"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export const App = class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className='App'>
						<Main />
					</div>
				</BrowserRouter>
			</Provider>
		)
	}
}

// module.exports = {
// 	App: App,
// 	store: store
// }
