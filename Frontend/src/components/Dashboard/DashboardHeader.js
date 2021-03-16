import React, { Component } from "react";
import "../../styles/dashboard.css";
import DashboardMiddle from "./DashboardMiddle";

class DashboardHeader extends Component {
  render() {
    return (
      <div className="Middle">
        <div className="MidDash">
          <div className="DashHeader">
            <h3>Dashboard</h3>
            <button className="btn float-right settle">Settle up</button>
            <button className="btn float-right expense">Add an expense</button>
            <DashboardMiddle />
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
