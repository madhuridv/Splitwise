import React, { Component } from "react";
import "../../styles/dashboard.css";
import DashboardMiddle from "./DashboardMiddle";
import axios from "axios";
import backendServer from "../../webConfig.js";

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("user_id"),
    };
  }
  onSettleUp = (e) => {
    e.preventDefault();
    alert("Ready to Settle Up?");
    console.log(this.state.user_id);
    const userInfo = { user_id: this.state.user_id };
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/settleup`, userInfo)
      .then((response) => {
        console.log("response from Axios query", response.data);
        // this.setState({
        //   groupMembers: this.state.groupMembers.concat(response.data),
        // });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };
  render() {
    return (
      <div className="Middle">
        <div className="MidDash">
          <div className="DashHeader">
            <h3>Dashboard</h3>
            <button
              className="btn float-right settle"
              onClick={this.onSettleUp}
            >
              Settle up
            </button>

            <DashboardMiddle />
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
