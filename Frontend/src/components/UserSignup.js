import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userSignup } from "../actions/signupActions";
import { Redirect } from "react-router";

import logo from "../images/logo.png";

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.userSignup(data);

    this.setState({
      signupFlag: 1,
    });
  };

  render() {
    //redirect based on successful signup
    let redirectVar = null;
    let message = "";

    console.log(this.props.user);
    // if (localStorage.getItem("user_id")) {
    //   redirectVar = <Redirect to="/dashboard" />; } else
    // if (this.props.user === "USER_ADDED" && this.state.signupFlag) {
    if (this.props.user.id && this.state.signupFlag) {
      localStorage.setItem("email_id", this.props.user.email);
      localStorage.setItem("user_id", this.props.user.id);
      localStorage.setItem("name", this.props.user.username);
      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("email_id"));
      console.log(localStorage.getItem("user_id"));
      alert("You have registered successfully");
      redirectVar = <Redirect to="/dashboard" />;
    } else if (this.props.user === "USER_EXISTS" && this.state.signupFlag) {
      message = "Email ID is already registered";
    }
    return (
      <div class="container signup">
        {redirectVar}

        <div class="signup-logo">
          <img src={logo} style={{ height: "fit-content" }} alt="Splitwise" />
        </div>

        <div class="signup-form">
          <div class="panel">
            <h2>INTRODUCE YOURSELF</h2>
          </div>
          <br />

          <form onSubmit={this.onSubmit}>
            <label htmlFor="">Hi there! My name is</label>
            <input
              type="text"
              class="form-control"
              name="username"
              onChange={this.onChange}
              placeholder="Name"
              pattern="^[A-Za-z0-9 ]+$"
              required
            />

            <label htmlFor="">Here’s my email address:</label>
            <input
              type="email"
              class="form-control"
              name="email"
              onChange={this.onChange}
              placeholder="Email Id"
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
              title="Please enter valid email address"
              required
            />

            <label htmlFor="">And here’s my password:</label>
            <input
              type="password"
              class="form-control"
              name="password"
              onChange={this.onChange}
              placeholder="Password"
              required
            />

            <div style={{ color: "#ff0000" }}>{message}</div>
            <br />
            <button type="submit" class="btn btn-primary">
              Signup
            </button>
            <br />
            <br />

            <br />
          </form>
        </div>
      </div>
    );
  }
}

UserSignup.propTypes = {
  userSignup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.signup.user,
  };
};

export default connect(mapStateToProps, { userSignup })(UserSignup);
