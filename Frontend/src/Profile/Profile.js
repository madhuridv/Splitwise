import React, { Component } from "react";
import { Redirect } from "react-router";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import UserProfile from "./UserProfile";
import "../styles/userProfile.css";

class Profile extends Component {
  componentWillMount() {
    document.title = "Your Profile";
  }
  render() {
    let profileComponent = null;
    let redirectVar = null;
    if (localStorage.getItem("user_id")) {
      profileComponent = <UserProfile />;
    } else {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <DashboardNavbar />
        <br />
        {profileComponent}
      </div>
    );
  }
}
export default Profile;
