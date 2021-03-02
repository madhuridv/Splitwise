/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  InputGroup,
  Col,
  FormControl,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import backendServer from "../webConfig";
import { getUser, updateUser } from "../actions/userProfileActions";
import profileIcon from "../images/profile_icon.png";
//import "../styles/userProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      var { user } = nextProps;

      var userData = {
        user_id: user.user_id || this.state.user_id,
        name: user.name || this.state.name,
        email_id: user.email_id || this.state.email_id,
        address: user.address || this.state.address,
        phone_number: user.phone_number || this.state.phone_number,
        user_image: user.user_image || this.state.user_image,
      };

      this.setState(userData);
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.file);
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${backendServer}/grubhub/uploads/user/${this.state.user_id}`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          fileText: "Choose file...",
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let data = Object.assign({}, this.state);
    this.props.updateUser(data);
  };

  render() {
    var imageSrc,
      fileText = this.state.fileText || "Change your avatar",
      title = this.state.name;
    if (this.state) {
      imageSrc = `${backendServer}/images/user/${this.state.user_image}`;
    }
    return (
      <div>
        <div class="card-columns">
          <div class="card">
            <img
              className="card-img-top"
              src={profileIcon}
              alt="profile picture"
              width="5"
              height="300"
            />
            {/* <img class="card-img-top" src={imageSrc} alt="profile picture" /> */}
            <div class="card-body">
              <form onSubmit={this.onUpload}>
                <br />
                <br />
                <br />
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
                <br />
                <br />
              </form>
            </div>
          </div>

          <div class="card p-3">
            <h4>Profile</h4>
            <br />
            <Form onSubmit={this.onUpdate}>
              <Form.Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label> Your Name</Form.Label>
                  <Button variant="link">Edit</Button>
                  <Form.Control
                    name="name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.name}
                    pattern="^[A-Za-z0-9 ]+$"
                    required={true}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="email_id">
                  <Form.Label>Your email address</Form.Label>
                  <Button variant="link">Edit</Button>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.state.email}
                    disabled
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Your phone number</Form.Label>
                  <Button variant="link">Edit</Button>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    onChange={this.onChange}
                    value={this.state.phone_number}
                    required={true}
                    pattern="^[0-9]+$"
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </div>

          <div class="card">
            <div class="card-body">
              <Form onSubmit={this.onUpdate}>
                <Form.Row>
                  <Form.Group as={Col} controlId="currency">
                    <Form.Label> Your default Currency</Form.Label>

                    <InputGroup>
                      <FormControl placeholder="Select your currency" />
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        id="input-group-dropdown-2"
                      >
                        <Dropdown.Item href="#">USD</Dropdown.Item>
                        <Dropdown.Item href="#">INR</Dropdown.Item>
                        <Dropdown.Item href="#">EUR</Dropdown.Item>
                        <Dropdown.Item href="#">AFN</Dropdown.Item>
                        <Dropdown.Item href="#">AUD</Dropdown.Item>
                        <Dropdown.Item href="#">NZD</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="timezone">
                    <Form.Label> Your timezone</Form.Label>
                    <InputGroup>
                      <FormControl placeholder="Select your timezone" />
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        id="input-group-dropdown-2"
                      >
                        <Dropdown.Item href="#">Chicago (GMT-6)</Dropdown.Item>
                        <Dropdown.Item href="#">Denver (GMT-7)</Dropdown.Item>
                        <Dropdown.Item href="#">Phoenix (GMT-7)</Dropdown.Item>
                        <Dropdown.Item href="#">
                          Los Angeles (GMT-8))
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          Anchorage (GMT-9)
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          Honolulu (GMT-10)
                        </Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="language">
                    <Form.Label> Your language</Form.Label>

                    <InputGroup>
                      <FormControl placeholder="Select Your Language" />
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        id="input-group-dropdown-2"
                      >
                        <Dropdown.Item href="#">English</Dropdown.Item>
                        <Dropdown.Item href="#">Spanish</Dropdown.Item>
                        <Dropdown.Item href="#">Deutch</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </div>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.userProfile.user,
});

export default connect(mapStateToProps, { getUser, updateUser })(UserProfile);
