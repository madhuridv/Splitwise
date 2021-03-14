import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

function AddExpense() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="">
      <div className="MidDash">
        <div className="DashHeader">
          <h3>Groups</h3>

          <button className="btn float-right expense" onClick={handleShow}>
            Add an expense
          </button>
        </div>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <div class="container mt-4">
          <Modal.Header closeButton>
            <Modal.Title class="text-center text-info">SplitWise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Add Expense</h4>
                  </div>
                </div>
                <form class="form" id="expense-form">
                  <div class="form-group">
                    <label>Description</label>
                    <input id="description" class="form-control" type="text" />
                    <p id="error-description" class="text-danger"></p>
                  </div>

                  <div class="form-group">
                    <label>Amount</label>
                    <input
                      pattern="^[0-9]*$"
                      id="expense-amount"
                      class="form-control"
                      type="number"
                    />
                    <p id="error-expense-amount" class="text-danger"></p>
                  </div>
                  <div class="form-group">
                    <label>Split Expense </label>
                    <select id="split-type" class="form-control">
                      <option value="equally">EQUALLY</option>
                      <option value="exact">EXACT</option>
                      <option value="percent">PERCENT</option>
                    </select>
                    <p id="error-split-type" class="text-danger"></p>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block">
                    Save
                  </button>
                </form>
                <div
                  id="error-message"
                  style={{ display: "none" }}
                  class="mt-4 alert alert-danger"
                ></div>
                <div
                  id="success-message"
                  style={{ display: "none" }}
                  class="mt-4 alert alert-success"
                ></div>
                <br />
              </div>
              <div class="col-md-2"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save It!
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
export default AddExpense;
