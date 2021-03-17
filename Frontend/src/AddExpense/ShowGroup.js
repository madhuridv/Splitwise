/* eslint-disable */
import React, { Component } from "react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import AddExpense from "./AddExpense";
import axios from "axios";
import backendServer from "../webConfig";

//to show list of groups
class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      userEmail: localStorage.getItem("email"),
      recentExpense: [],
    };
  }

  componentDidMount() {
    const groupNameFromProps = this.props.match.params.groupName;
    this.setState({
      groupName: groupNameFromProps,
    });
    console.log(groupNameFromProps);
    axios
      .post(`${backendServer}/mygroup/getexpensedetails`, {
        groupNameFromProps,
      })
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          recentExpense: this.state.recentExpense.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  }

  render() {
    let expense = this.state.recentExpense;
    console.log("expense", expense);
    let gName = this.state.groupName;
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
                    <h3>{gName}</h3>
                  </div>
                  <AddExpense groupName={this.state.groupName} />
                </div>
                <div>
                  <div className="">
                    <h2>Recent Activity</h2>
                    {expense.map((exp) => (
                      <div class="list-group list-group-flush">
                     
                      <div class="list-group list-group-flush">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">{exp.expenseDescription}</h5>
                          <small class="text-muted">{exp.Date}</small>
                        </div>
                        <p class="mb-1">{exp.groupName}</p>
                        <small class="text-muted">{exp.addedBy}.</small>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowGroup;
