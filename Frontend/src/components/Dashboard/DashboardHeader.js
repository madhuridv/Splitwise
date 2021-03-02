import React from "react";
import Button from "../../Button";
import "../../styles/dashboard.css";

function DashboardHeader(props) {
  function handleChangeExp() {
    const currentView = props.viewType.map((item) => {
      item.modal = true;
      return item;
    });
    props.method(currentView);
  }
  function handleChangeOut() {
    const currentView = props.viewType.map((item) => {
      item.settle = true;
      return item;
    });
    props.method(currentView);
  }

  function RenderButton() {
    return (
      <div className="MidDash">
        <div className="DashHeader">
          <h3>Dashboard</h3>
          
          <Button class="btn float-right expense" name="Add an expense" onclickmeth={handleChangeExp} />
          <Button class="btn float-right settle" name="Settle up" onclickmeth={handleChangeOut}/>
     
        </div>
      </div>

      
    );
  }
  return (
    <div className="dashboard-header">
      <h3 className="h3-dashboard">{props.name}</h3>
      <RenderButton />
    </div>
  );
}

export default DashboardHeader;
