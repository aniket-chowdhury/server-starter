import React, { Component } from 'react'
// import Form from './home/Form';

export default class Logout extends Component {
    componentWillMount(){
        sessionStorage.clear()        
    }
    render() {
        return (
            <div>                
            </div>
        )
    }
}
