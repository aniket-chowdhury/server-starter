import React, { Component } from 'react'
import Form from './home/Form';

export default class Logout extends Component {
    state = {msg:''}
    componentWillMount() {
        if (sessionStorage.getItem('token')) {
            sessionStorage.clear()
            this.setState({msg:'You have been logged out successfully'})
        }
    }
    render() {
        return (
            <div>
                <Form msg={this.state.msg}></Form>
            </div>
        )
    }
}
