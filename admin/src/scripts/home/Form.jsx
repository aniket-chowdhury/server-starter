import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import links from "../Links";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  auth() {
    const token = sessionStorage.getItem('token')
    if (token) {
      axios.post(links.server + 'api/verify?token=' + token)
        .then(result => {
          if (result['status'] === 200) {
            window.location = '/'
          }
        })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    // get our form data out of state
    const { username, password } = this.state;

    axios
      .post(links.server + "login", { username, password })
      .then(result => {
        const token = result.data["token"];
        sessionStorage.setItem("token", token);
        this.auth()
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      
      <MDBContainer>
        {this.props.msg}
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={this.onSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  label="Username"
                  icon="envelope"
                  group
                  type="text"
                  name="username"
                  validate
                  error="wrong"
                  success="right"
                  onChange={this.onChange}
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  name="password"
                  group
                  type="password"
                  validate
                  onChange={this.onChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-sm white black-text" type="submit">
                  Login
                </button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Form;
