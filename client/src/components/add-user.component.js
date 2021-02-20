import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserFullName = this.onChangeUserFullName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeEmlAddrssVld = this.onChangeEmlAddrssVld.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeAnonymusStat = this.onChangeAnonymusStat.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      UserID: null,
      UserFullName: "",
      Password: "",
      EmailAddress: "",
      EmlAddrssVld: "",
      NickName: "",
      AnonymusStat: "",
      submitted: false,
    };
  }

  onChangeUserFullName(e) {
    this.setState({
      UserFullName: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value,
    });
  }

  onChangeEmailAddress(e) {
    this.setState({
      EmailAddress: e.target.value,
    });
  }

  onChangeEmlAddrssVld(e) {
    this.setState({
      EmlAddrssVld: e.target.value,
    });
  }

  onChangeNickName(e) {
    this.setState({
      NickName: e.target.value,
    });
  }

  onChangeAnonymusStat(e) {
    this.setState({
      AnonymusStat: e.target.value,
    });
  }

  saveUser() {
    var data = {
      UserID: this.state.UserID,
      UserFullName: this.state.UserFullName,
      Password: this.state.Password,
      EmailAddress: this.state.EmailAddress,
      EmlAddrssVld: this.state.EmlAddrssVld,
      NickName: this.state.NickName,
      AnonymusStat: this.state.AnonymusStat,
    };

    UserDataService.create(data)
      .then((response) => {
        this.setState({
          UserID: response.data.UserID,
          UserFullName: response.data.UserFullName,
          Password: response.data.Password,
          EmailAddress: response.data.EmailAddress,
          EmlAddrssVld: response.data.EmlAddrssVld,
          NickName: response.data.NickName,
          AnonymusStat: response.data.AnonymusStat,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      UserID: null,
      UserFullName: "",
      Password: "",
      EmailAddress: "",
      EmlAddrssVld: "",
      NickName: "",
      AnonymusStat: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="UserFullName">Title</label>
              <input
                type="text"
                className="form-control"
                id="UserFullName"
                required
                value={this.state.UserFullName}
                onChange={this.onChangeUserFullName}
                name="UserFullName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Password">Title</label>
              <input
                type="text"
                className="form-control"
                id="Password"
                required
                value={this.state.Password}
                onChange={this.onChangePassword}
                name="Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="EmailAddress">Title</label>
              <input
                type="text"
                className="form-control"
                id="EmailAddress"
                required
                value={this.state.EmailAddress}
                onChange={this.onChangeEmailAddress}
                name="EmailAddress"
              />
            </div>

            <div className="form-group">
              <label htmlFor="EmlAddrssVld">Title</label>
              <input
                type="text"
                className="form-control"
                id="EmlAddrssVld"
                required
                value={this.state.EmlAddrssVld}
                onChange={this.onChangeEmlAddrssVld}
                name="EmlAddrssVld"
              />
            </div>

            <div className="form-group">
              <label htmlFor="NickName">NickName</label>
              <input
                type="text"
                className="form-control"
                id="NickName"
                required
                value={this.state.NickName}
                onChange={this.onChangeNickName}
                name="NickName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="AnonymusStat">Title</label>
              <input
                type="text"
                className="form-control"
                id="AnonymusStat"
                required
                value={this.state.AnonymusStat}
                onChange={this.onChangeAnonymusStat}
                name="AnonymusStat"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Sign Up
            </button>
          </div>
        )}
      </div>
    );
  }
}
