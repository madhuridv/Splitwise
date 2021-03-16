import React, { Component } from "react";
import { Route, BrowserRouter as Switch } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="main-content">
          <div className="dashboard-content">
            <Switch>
              <DashboardNavbar />
              <DashboardHeader />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
