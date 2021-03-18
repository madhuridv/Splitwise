import React, { Component } from "react";
import { Link } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import "../styles/dashboard.css";

import { connect } from "react-redux";
import "../styles/signup.css";
import backendServer from "../webConfig";
import axios from "axios";

export class MyGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      email: localStorage.getItem("email_id"),
      user_id: localStorage.getItem("user_id"),
    };
  }
  //To get the all  groups where user is member of those groups
  componentDidMount() {
    document.title = "My Group";
    const memberInfo = { groupMember: this.state.user_id };
    console.log("Members data", memberInfo);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/mygroup/getGroup`, memberInfo)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          groups: this.state.groups.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }

  //to change the isAccepted status true
  onJoinClick = (gName) => {
    console.log(gName);
    const groupData = { groupName: gName, groupMember: this.state.user_id };
    console.log("groupData", groupData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/mygroup/joingroup`, groupData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.status == 200 && response.data === "JOINED_GROUP") {
          alert("Joined group successfully!");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };

  onLeaveClick = (gName) => {
    console.log(gName);
    const exitData = { groupName: gName, groupMember: this.state.user_id };
    console.log(exitData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/mygroup/exitgroup`, exitData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.status == 200 && response.data === "GROUP_DELETED") {
          alert("successfully!");
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };

  render() {
    let groupList = this.state.groups;
    return (
      <div lassName="">
        <DashboardNavbar />
        <div c>
          <div className="MidDash">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col">
                <div className="container">
                  <div className="row ">
                    <div className="col ">
                      <h3>My Groups</h3>
                    </div>
                    <div className="col">
                      <form className="form-inline my-2 my-lg-0">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success my-2 my-sm-0"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                  <div>
                    {groupList.map((group) =>
                      group.isAccepted === "False" ? (
                        <div
                          className="list-group list-group-horizontal"
                          key={group.groupName}
                        >
                          <Link
                            className="list-group-item list-group-item-action"
                            style={{ width: "80%", marginRight: "10px" }}
                            to={`/groups/${group.groupName}`}
                          >
                            {group.groupName}
                          </Link>

                          <span>
                            <button
                              className="btn btn-outline-success my-2 my-sm-0"
                              onClick={() => this.onJoinClick(group.groupName)}
                            >
                              Accept
                            </button>
                          </span>
                        </div>
                      ) : (
                        <div
                          className="list-group list-group-horizontal"
                          key={group.groupName}
                        >
                          <Link
                            className="list-group-item list-group-item-action"
                            style={{ width: "80%", marginRight: "10px" }}
                            to={`/groups/${group.groupName}`}
                          >
                            {group.groupName}
                          </Link>
                          <span>
                            <button
                              className="btn btn-outline-danger my-2 my-sm-0"
                              onClick={() => this.onLeaveClick(group.groupName)}
                            >
                              Quit
                            </button>
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default MyGroup;
//connect(mapStateToProps, mapDispatchToProps)(Add);
