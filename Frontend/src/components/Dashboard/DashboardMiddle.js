import React, { Component } from "react";

class DashboardMiddle extends Component {
  state = {};
  render() {
    return (
      <div className="Middle">
        <div className="MidDash">
          <div className="DashHeader">
            <div className="total">
              <div className="fitting">
                <label htmlFor="">total balance</label>
                <p className="green">$ 0.00</p>
              </div>
              <div className="fitting">
                <label htmlFor="">you owe</label>
                <p style={{ color: "red" }}>$ 0.000</p>
              </div>
              <div className="fitting">
                <label htmlFor="">you are owed</label>
                <p className="green">$ 0.00</p>
              </div>
            </div>
          </div>

          <div className="totalCollection">
            <div>
              <label htmlFor="">YOU OWE</label>
            </div>
            <div>
              <label htmlFor="" className="float-right mr-4">
                YOU ARE OWED
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="float-left ml-3 borders">
              {/* <ul>
              {owe.length == 0 ? (
                <li>You do not owe anything</li>
              ) : (
                owe.map((value) => (
                  <li>
                    <img
                      className="imgs"
                      src={require("../../images/person-profile.png")}
                      alt=""
                      align="left"
                    />
                    <div className="inline">
                      <h5>{value.name}</h5>
                      <span>you owe ${-value.data.ammount}</span>
                    </div>
                  </li>
                ))
              )} */}
              <li>
                {/* <img
                className="imgs"
                src={require("../../images/person-profile.png")}
                alt="" align="left"
              /> */}
                <div className="inline">
                  <h5>Ram</h5>
                  <span>you owe $500</span>
                </div>
              </li>
              {/* </ul> */}
            </div>

            <div>
              {/* <ul>
              {owed.length == 0 ? (
                <li>You do not owe anything</li>
              ) : (
                owed.map((value) => (
                  <li>
                    <img
                      className="imgs"
                      src={require("../../images/person-profile.png")}
                      alt=""
                      align="left"
                    />
                    <div className="inline">
                      <h5>{value.name}</h5>
                      <span>owes you ${value.data.ammount}</span>
                    </div>
                  </li>
                ))
              )}

              {/* <li>
              <img
                className="imgs"
                src={require("../../images/person-profile.png")}
                alt=""
                align="left"
              />
              <div className="inline">
                <h5>Ram</h5>
                <span>you owe $500</span>
              </div>
            </li> 
            </ul> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardMiddle;
