import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import queryString from 'query-string'
import axios from 'axios';

import App from './home/App';
import SecureApp from './secure/SecureApp';
import Error from './Error'

import links from './Links'
import Logout from './Logout';

export default class Routes extends Component {
    state = { auth: false }
    componentWillMount() {
        const value = queryString.parse(document.location.search)['logout']
        if (value) {
            sessionStorage.clear()
        }
        const token = sessionStorage.getItem('token')

        if (token) {
            axios.post(links.server + 'api/verify?token=' + token)
                .then(result => {
                    this.setState({ auth: true })
                })
        }
    }
    render() {
        return (
            <Fragment>
                <Router>
                    <div>
                        <Switch>
                            {
                                this.state.auth ? <Route path='/' exact component={SecureApp}></Route>
                                    :
                                    <Route path='/' exact component={App}></Route>
                            }
                            <Route path='/logout' exact component={Logout}></Route>
                            <Route component={() => <Error error='404' />} />
                        </Switch>
                    </div>
                </Router>
            </Fragment>

        )
    }
}
