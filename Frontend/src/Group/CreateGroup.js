import React, { Component } from "react";
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
      user_id: localStorage.getItem("user_id"),
    };
  }

  onSubmit = (e) =>{
    e.preventDefault();

    const data = {
        groupname:this.state.groupname,
        user_id : this.state.user_id
    }

    axios.post( `${backendServer}/creategroup`,data)
    .then((response) =>{console.log(response)})
    .catch((err)=>console.log(("error"),err))
  };


  render() {
    
    var imageSrc,
      fileText = this.state.fileText || "Change your avatar";

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
                  src={imageSrc}
                  alt="profile picture"
                />
              </div>
              {/* <img class="card-img-top" src={imageSrc} alt="profile picture" /> */}
              <div class="card-body">
                <form onSubmit={this.onUpload}>
                  <div class="form-group">
                    <label for="image">{fileText}</label>
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
                      value={this.state.name}
                      pattern="^[A-Za-z0-9 ]+$"
                      required={true}
                      placeholder="Group Name"
                    />
                  </Form.Group>
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
