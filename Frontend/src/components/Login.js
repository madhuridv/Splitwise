import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import { userLogin } from "../actions/loginAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/signup.css";
import logo from "../images/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit Login handler to send a request to the node backend
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.userLogin(data);

    this.setState({
      loginFlag: 1,
    });
  };
  render() {
    let redirectVar = null;
    let message = "";

    if (this.props.user && this.props.user.id) {
      localStorage.setItem("email_id", this.props.user.email);
      localStorage.setItem("user_id", this.props.user.id);
      localStorage.setItem("name", this.props.user.username);
      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("email_id"));
      console.log(localStorage.getItem("user_id"));

      redirectVar = <Redirect to="/dashboard" />;
    } else if (this.props.user === "NO_USER" && this.state.loginFlag) {
      message = "No user with this email id";
    } else if (
      this.props.user === "INCORRECT_PASSWORD" &&
      this.state.loginFlag
    ) {
      message = "Incorrect Password";
    }
    return (
      <div>
        <Header />
        {redirectVar}

        <div class="container signup">
          <div class="signup-logo">
            <img
              className="landing-logo"
              style={{ height: "fit-content" }}
              src={logo}
              alt="Splitwise"
            />
          </div>
          <div class="signup-form">
            <h2>WELCOME TO SPLITWISE</h2>
            <form onSubmit={this.onSubmit}>
              <div style={{ color: "#ff0000" }}>{message}</div>
              <br />
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email Id"
                  pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                  title="Please enter valid email address"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  onChange={this.onChange}
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};
export default connect(mapStateToProps, { userLogin })(Login);
