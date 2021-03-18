import React, { Component } from "react";
import DashboardNavbar from "../DashboardNavbar";
import axios from "axios";
import backendServer from "../../../webConfig";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
    };
  }
  componentDidMount() {
    document.title = "Recent Activiy";

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/dashboard/recent`)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          activity: this.state.activity.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }
  render() {
    let activityList = this.state.activity;
    console.log(activityList);
    return (
      <div className="showGroup">
        <DashboardNavbar />
        <div className="">
          <div className="row">
            <div className="col-sm-2"></div>

            <div className="col" id="dash-center">
              <div className="container">
                <div className="row  align-items-center">
                  <div className="col">
                    <h3>Recent Activities</h3>
                    {activityList.map((act) => (
                      <div className="list-group list-group-horizontal">
                        <ul class="list-group">
                          <li class="list-group-item">{act.userName} added {act.expenseDescription} to {act.groupName}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentActivity;
