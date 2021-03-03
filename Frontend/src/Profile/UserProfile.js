/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
//import { Link } from "react-router-dom";
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

//import "../styles/userProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: localStorage.getItem("name"),
      // email: localStorage.getItem("email_id"),
    };

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
        user_id: user.id || this.state.user_id,
        name: user.username || this.state.name,
        email: user.email || this.state.email,
        address: user.address || this.state.address,
        phone_number: user.phone_number || this.state.phone_number,
        user_image: user.user_image || this.state.user_image,
        currency: user.currency || this.state.currency,
        user_language: user.user_language || this.state.user_language,
        timezone: user.timezone || this.state.timezone,
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
        `${backendServer}/uploads/${this.state.user_id}`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          fileText: "Choose file",
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let data = Object.assign({}, this.state);
    this.props.updateUser(data);
  };

  render() {
    console.log();
    var imageSrc,
      fileText = this.state.fileText || "Change your avatar",
      title = this.state.name;
    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
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

          <div class="card border-0">
            <div class="card-body">
              <Form onSubmit={this.onUpdate} onSelect={this.handleSelect}>
                <Form.Row>
                  <Form.Group as={Col} controlId="currency">
                    <Form.Label> Your default Currency</Form.Label>

                    <InputGroup>
                      <FormControl
                        placeholder="Select your currency"
                        value={this.state.currency}
                      />
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        id="input-group-dropdown-2"
                      >
                        <Dropdown.Item>USD</Dropdown.Item>
                        <Dropdown.Item>INR</Dropdown.Item>
                        <Dropdown.Item>EUR</Dropdown.Item>
                        <Dropdown.Item>AFN</Dropdown.Item>
                        <Dropdown.Item>AUD</Dropdown.Item>
                        <Dropdown.Item>NZD</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="timezone">
                    <Form.Label> Your timezone</Form.Label>
                    <InputGroup>
                      <FormControl
                        placeholder="Select your timezone"
                        value={this.state.timezone}
                      />
                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        id="input-group-dropdown-2"
                      >
                        <Dropdown.Item>Chicago (GMT-6)</Dropdown.Item>
                        <Dropdown.Item>Denver (GMT-7)</Dropdown.Item>
                        <Dropdown.Item>Phoenix (GMT-7)</Dropdown.Item>
                        <Dropdown.Item>Los Angeles (GMT-8))</Dropdown.Item>
                        <Dropdown.Item>Anchorage (GMT-9)</Dropdown.Item>
                        <Dropdown.Item>Honolulu (GMT-10)</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="language">
                    <Form.Label> Your language</Form.Label>

                    <InputGroup>
                      <FormControl
                        placeholder="Select Your Language"
                        value={this.state.user_language}
                      />
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
