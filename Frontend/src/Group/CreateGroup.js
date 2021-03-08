import React, { Component } from "react";
import { render } from "react-dom";
import { useState } from "react";

import backendServer from "../webConfig";
import axios from "axios";
import {
  InputGroup,
  Col,
  FormControl,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      user_id: localStorage.getItem("user_id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email_id"),
    };
  }

  handleChange = (idx) => (e) => {
    const rows = [...this.state.rows];
    console.log(JSON.stringify(e.target.value));

    this.setState({
      rows: {
        ...this.state.rows,
        [e.target.name]: e.target.value,
      },
    });
    console.log(rows);
  };

  handleAddRow = () => {
    const item = {
      mem_name: "",
      mem_email: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      groupname: this.state.groupname,
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      groupname: this.state.groupname,
    };

    axios
      .post(`${backendServer}/creategroup`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log("error", err));
  };

  render() {
    var imageSrc;

    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
      <div>
        <div>
          <div class="card-columns ">
            <div class="card border-0">
              <div class="col-sm-6">
                <img
                  className="card-img-top"
                  src={`${backendServer}/images/${this.state.user_image}`}
                  alt="profile picture"
                />
              </div>
              {/* <img class="card-img-top" src={imageSrc} alt="profile picture" /> */}
              <div class="card-body">
                <form onSubmit={this.onUpload}>
                  <div class="form-group">
                    <label for="image"></label>
                    <input
                      type="file"
                      class="form-control-file"
                      name="image"
                      accept="image/*"
                      onChange={this.onImageChange}
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary">
                    Upload
                  </Button>
                </form>
              </div>
            </div>

            <div class="card p-3 border-0">
              <h4>START A GROUP HERE</h4>
              <br />
              <Form onSubmit={this.onSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label> My group shall be called...</Form.Label>

                    <Form.Control
                      name="groupname"
                      type="text"
                      onChange={this.onChange}
                      //value={this.state.name}
                      pattern="^[A-Za-z0-9 ]+$"
                      required={false}
                      placeholder="Group Name"
                    />
                  </Form.Group>
                </Form.Row>
                <br></br>
                <Form.Row>
                  <Form.Label> GROUP MEMBERS</Form.Label>
                </Form.Row>

                <Form.Row>
                  <Col>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      className="form-control"
                    />
                  </Col>
                  <Col>
                    <input
                      type="text"
                      name="name"
                      value={this.state.email}
                      className="form-control"
                    />
                  </Col>
                </Form.Row>
                <Form.Row>
                  <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                  >
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="mem_name"
                              value={item.mem_name}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="mem_email"
                              value={item.mem_email}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Button onClick={this.handleAddRow} variant="link">
                      Add Member
                    </Button>
                  </Col>
                  <Col>
                    <br></br>
                  </Col>
                </Form.Row>
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
