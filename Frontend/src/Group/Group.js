import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import CreateGroup from "./CreateGroup";
import { Redirect } from "react-router";
import "../styles/signup.css";

class Group extends Component {
  componentWillMount() {
    document.title = "Create group";
  }
  render() {
    let groupComp = null;
    let redirectVar = null;

    if (localStorage.getItem("user_id")) {
      groupComp = <CreateGroup />;
    } else {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}
        <DashboardNavbar />
        {groupComp}
      </div>
    );
  }
}

export default Group;
