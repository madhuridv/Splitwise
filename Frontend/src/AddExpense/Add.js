import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import AddExpense from "./AddExpense";
import "../styles/dashboard.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/signup.css";

export class Add extends Component {
  componentWillMount() {
    document.title = "Create group";
  }
  // static propTypes = {
  //   prop: PropTypes,
  // };

  render() {
    return (
      <div>
        <DashboardNavbar />
        <AddExpense />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default Add;
//connect(mapStateToProps, mapDispatchToProps)(Add);
