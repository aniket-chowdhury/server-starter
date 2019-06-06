import React, { Component, Fragment } from 'react'
import App from './home/App';
// eslint-disable-next-line
import SecureApp from './secure/SecureApp';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Routes extends Component {
    componentWillMount(){
        const token = sessionStorage.getItem('token')
        console.log(token);
        
        this.setState({secure:true})
    }
    render() {
        return (
            <Fragment>
                <Router>
                    <div>
                        <Route path='/' exact component={App}></Route>
                    </div>
                </Router>
            </Fragment>

        )
    }
}
