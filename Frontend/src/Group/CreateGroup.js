import React, { Component } from "react";
import backendServer from "../webConfig";
import axios from "axios";
import { Col, Form, Button } from "react-bootstrap";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [{ mem_name: null, mem_email: null }],
      user_id: localStorage.getItem("user_id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email_id"),
      suggestname: null,
    };
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios
      .get(`${backendServer}/creategroup/getUser`)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          suggestname: response.data[0].username
        });
        console.log("suggestname", this.state.suggestname);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          value={el.mem_name || ""}
          onChange={this.handleChangeName.bind(this, i)}
        />
        <input
          type="text"
          value={el.mem_email || ""}
          onChange={this.handleChangeEmail.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChangeName(i, event) {
    let values = [...this.state.values];
    values[i].mem_name = event.target.value;
    this.setState({ values });
  }
  handleChangeEmail(i, event) {
    let values = [...this.state.values];
    values[i].mem_email = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState((prevState) => ({
      values: [...prevState.values, { mem_name: null, mem_email: null }],
    }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }
  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state.values));

    const data = {
      user_id: this.state.user_id,
      name: this.state.name,
      email: this.state.email,
      groupname: this.state.groupname,
      values: this.state.values,
    };

    console.log("data", data);

    axios
      .post(`${backendServer}/creategroup`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log("error", err));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onUpload = (e) => {
    console.log("inside upload");
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
  render() {
    var imageSrc;
    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
      <div className="container signup">
        <div className="">
          <img
            className=""
            src={imageSrc}
            alt="profile picture"
            // style={{ height: "fit-content" }}
          />

          <form onSubmit={this.onUpload}>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
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
        <div className="signup-form">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="name">START A NEW GROUP</label>
                  <br></br>
                  <label htmlFor="name">My group shall be called...</label>
                  <input
                    type="text"
                    className="form-control"
                    name="groupname"
                    onChange={this.onChange}
                    value={this.state.groupname}
                    placeholder="Group Name"
                    required
                  />
                </div>
                <br></br>
                <label>GROUP MEMBERS</label>
                <div>
                  <input type="text" value={this.state.name} />
                  <input type="text" value={this.state.email} />
                </div>
                {this.state.values.map((el, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      name="mem_name"
                      value={el.mem_name || ""}
                      onChange={(e) => this.handleChangeName(i, e)}
                    />
                    <input
                      type="text"
                      name="mem_email"
                      value={el.mem_email || ""}
                      onChange={(e) => this.handleChangeEmail(i, e)}
                    />

                    <input
                      type="button"
                      value="X"
                      onClick={() => this.removeClick(i)}
                    />
                  </div>
                ))}
                <Button variant="link" onClick={() => this.addClick()}>
                  +Add Member
                </Button>

                <div className="form-group">
                  <br></br>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
