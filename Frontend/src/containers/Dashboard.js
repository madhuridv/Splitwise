import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, BrowserRouter as Switch } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import RecentActivity from "../components/Dashboard/RecentActivity/RecentActivity";
import DashHead from "../components/Dashboard/DashHead";

function Dashboard(props) {
  const history = useHistory();
  const [view, setView] = useState([
    {
      dash: "dash-exp",
      visibility: true,
    },
    {
      dash: "recent-activity",
      visibility: false,
    },
    {
      dash: "all-expenses",
      visibility: false,
    },
    {
      modal: false,
    },
    {
      settle: false,
    },
  ]);
  const [name, setName] = useState("");
  function allVisibility() {
    const currentViewModal = view.map((item) => {
      if (item.visibility === true) {
        item.visibility = false;
      }
      item.modal = false;
      return item;
    });
    handleView(currentViewModal);
  }
  function handleDashboardVisibility() {
    history.push("/home/dashboard");
    const currentViewModal = view.map((item) => {
      if (item.visibility === true) {
        item.visibility = false;
      }
      if (item.dash === "dash-exp") {
        item.visibility = true;
      }
      item.modal = false;
      return item;
    });
    handleView(currentViewModal);
    setName("");
  }
  function handleActivityVisibility() {
    const currentViewModal = view.map((item) => {
      if (item.visibility === true) {
        item.visibility = false;
      }
      if (item.dash === "recent-activity") {
        item.visibility = true;
      }
      item.modal = false;
      return item;
    });
    setName("");
    handleView(currentViewModal);
    history.push("/home/activity");
  }
  function handleAllExpensesVisibility() {
    history.push("/home/all");
    const currentViewModal = view.map((item) => {
      if (item.visibility === true) {
        item.visibility = false;
      }
      if (item.dash === "all-expenses") {
        item.visibility = true;
      }
      item.modal = false;
      return item;
    });
    setName("");
    handleView(currentViewModal);
  }
  function handleView(newView) {
    setView(newView);
  }
  
  const [expenses, setExpenses] = useState([
    {
      id: "",
      user_name: "",
      owe_name: "",
      amount: "",
      description: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      amountPaidBy: "",
      amountPaid: "",
    },
  ]);
  useEffect(() => {
    document.title = "Dashboard";
    const token = localStorage.getItem("login-key");
    axios
      .post(`http://localhost:4000/expense-view`, { data: token })
      .then((res) => {
        console.log(res.data);
        setExpenses((prevExpenses) => {
          prevExpenses = res.data;
          return prevExpenses;
        });
        if (res.data.length != 0) {
          // handleDashVisibility()
          history.push("/home/dashboard");
          // alert("0")
        }
      });
    return () => {};
  }, []);
  function updateAmountYouAreOwe() {
    var amount = 0;
    var amountPaid = 0;
    var prevName = [];
    expenses.map((item) => {
      if (
        prevName.indexOf(item.owe_name) === -1 &&
        props.user[1] === item.user_name
      ) {
        prevName.push(item.owe_name);
        parseFloat((amountPaid += parseFloat(item.amountPaidBy)));
      }
    });
    expenses.map((item) => {
      if (props.user[1] === item.user_name)
        parseFloat((amount += parseFloat(item.amount / 2)));
    });
    return amount - amountPaid;
  }
  function updateAmountYouOwe() {
    var amount = 0;
    var amountPaid = 0;
    var prevName = " ";
    expenses.map((item) => {
      if (prevName !== item.user_name && props.user[1] != item.user_name) {
        parseFloat((amountPaid += parseFloat(item.amountPaid)));
        prevName = item.user_name;
      }
    });
    expenses.map((item) => {
      if (props.user[1] != item.user_name)
        parseFloat((amount += parseFloat(item.amount / 2)));
    });
    return amount - amountPaid;
  }



  return (
    <>
      <div className="main-content">
        <div className="dashboard-content">
          <Switch>
            <DashboardNavbar />
            <Route exact path="/home/activity">
              <DashboardHeader
                method={handleView}
                viewType={view}
                name="Recent Activity"
                buttons="no"
              />
              {/* <DashboardHeader method={handleView} viewType={view} name="Recent Activity" buttons="no"/>
               <RecentActivity userData={props.user[1]} expenses={expenses} /> */}
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
