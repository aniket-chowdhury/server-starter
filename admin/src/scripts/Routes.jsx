import React, { Component, Fragment } from 'react'
import App from './home/App';
import SecureApp from './secure/SecureApp';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import links from './Links'
import Logout from './Logout';
import queryString from 'query-string'

export default class Routes extends Component {
    state = { auth: false }
    componentWillMount() {
        const value = queryString.parse(document.location.search)['logout']        
        if(value){
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
                        {
                            this.state.auth ? <Route path='/' exact component={SecureApp}></Route>
                                :
                                <Route path='/' exact component={App}></Route>
                        }
                    <Route path='/logout' exact component={Logout}></Route>
                    </div>
                </Router>
            </Fragment>

        )
    }
}
