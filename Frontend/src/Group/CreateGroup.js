import React, { Component } from "react";
import backendServer from "../webConfig";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: localStorage.getItem("email_id"),
      groupname: "",
      userData: [],
      options: [
        { name: "Srigar", id: 1 },
        { name: "Sam", id: 2 },
      ],
      selected: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onSelect = (data) => {
    this.setState({
      selected: data,
    });
    console.log("selected", this.state.selected);
  };

  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios
      .get(`${backendServer}/creategroup/getUser`)
      .then((response) => {
        console.log("data is", response.data);
        this.setState({
          userData: this.state.userData.concat(response.data),
        });
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
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

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.selected);
    let members = [];

    for (var i = 0; i < this.state.selected.length; i++) {
      members[i] = this.state.selected[i].email;
    }
    console.log("members array:", members);

    const groupData = {
      email: this.state.email,
      groupname: this.state.groupname,

      members: members,
    };

    console.log("groupData is :", groupData);
    // axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/creategroup/addgroup`, groupData)
      .then((response) => {
        console.log("response after post", response);
        if (response.status == 200 && response.data === "GROUP_ADDED") {
          alert("Group created sucessfully!");
        } 
      })
      .catch((error) => {
        alert("Group name already exists!");
        console.log("error:", error);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    var imageSrc;
    let details = this.state.userData;

    if (this.state) {
      imageSrc = `${backendServer}/images/${this.state.user_image}`;
    }
    return (
      <div className="container signup">
        <div className="">
          <img className="" src={imageSrc} alt="profile picture" />

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
                <Multiselect
                  options={details} // Options to display in the dropdown
                  //selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
                  onSelect={this.onSelect}
                  displayValue="email" // Property name to display in the dropdown options
                />

                <br></br>

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
