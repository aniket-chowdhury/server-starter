import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Error from './Error'

import App from './home/App'

export default class Routes extends Component {
	render() {
		return (
			<Fragment>
				<Router>
					<div>
						<Switch>
							<Route path="/" exact component={App}></Route>

							<Route component={() => <Error error="404" />} />
						</Switch>
					</div>
				</Router>
			</Fragment>
		)
	}
}
