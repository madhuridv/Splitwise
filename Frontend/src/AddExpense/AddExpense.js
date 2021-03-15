import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

function AddExpense() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setdescription] = useState();
  const [amount, setAmount] = useState();

  const onChangeDesc = (e) => {
    setdescription({
      [e.target.name]: e.target.value,
    });
  };
  const onChangeAmt = (e) => {
    setAmount({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitExpense = (e) => {
    e.preventDefault();
    console.log("Form on submit");
    console.log(description);
    console.log(amount);
  };

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
      <Modal show={show} onHide={handleClose}>
        <div className="container mt-4">
          <Modal.Header closeButton>
            <Modal.Title className="text-center text-info">
              Add a Bill
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <form
                  className="form"
                  id="expense-form"
                  onSubmit={onSubmitExpense}
                >
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      id="description"
                      name="description"
                      onChange={onChangeDesc}
                      className="form-control"
                      type="text"
                    />
                    <p id="error-description" className="text-danger"></p>
                  </div>

                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      pattern="^[0-9]*$"
                      id="amount"
                      name="amount"
                      placeholder="0.00$"
                      onChange={onChangeAmt}
                      className="form-control"
                      type="number"
                    />
                    <p id="error-expense-amount" className="text-danger"></p>
                  </div>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <button type="submit" className="btn float-right expense">
                    Save
                  </button>
                </form>
                <div
                  id="error-message"
                  style={{ display: "none" }}
                  className="mt-4 alert alert-danger"
                ></div>
                <div
                  id="success-message"
                  style={{ display: "none" }}
                  className="mt-4 alert alert-success"
                ></div>
                <br />
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
export default AddExpense;
