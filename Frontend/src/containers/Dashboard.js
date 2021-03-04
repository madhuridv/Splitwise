import React, { Component } from "react";

import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { showFriend: false, showExp: false, settleUp: false };
  }

  // alwaysRun(name) {
  //   console.log("this is username ...........", name);
  // }
  render() {
    return (
      <div>
        {/* {this.alwaysRun(this.state.name)} */}
        <DashboardNavbar />

        <DashboardHeader />
      </div>
    );
  }
}

export default Dashboard;
