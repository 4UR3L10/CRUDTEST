import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserFullName = this.onChangeUserFullName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeEmlAddrssVld = this.onChangeEmlAddrssVld.bind(this);
    this.onChangeNickName = this.onChangeNickName.bind(this);
    this.onChangeAnonymusStat = this.onChangeAnonymusStat.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        UserID: null,
        UserFullName: "",
        Password: "",
        EmailAddress: "",
        EmlAddrssVld: "",
        NickName: "",
        AnonymusStat: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.UserID);
  }

  onChangeUserFullName(e) {
    const UserFullName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          UserFullName: UserFullName,
        },
      };
    });
  }

  onChangePassword(e) {
    const Password = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        Password: Password,
      },
    }));
  }

  onChangeEmailAddress(e) {
    const EmailAddress = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        EmailAddress: EmailAddress,
      },
    }));
  }

  onChangeEmlAddrssVld(e) {
    const EmlAddrssVld = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        EmlAddrssVld: EmlAddrssVld,
      },
    }));
  }

  onChangeNickName(e) {
    const NickName = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        NickName: NickName,
      },
    }));
  }

  onChangeAnonymusStat(e) {
    const AnonymusStat = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        AnonymusStat: AnonymusStat,
      },
    }));
  }

  getUser(UserID) {
    UserDataService.get(UserID)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      UserID: this.state.currentUser.UserID,
      UserFullName: this.state.currentUser.UserFullName,
      Password: this.state.currentUser.Password,
      EmailAddress: this.state.currentUser.EmailAddress,
      EmlAddrssVld: this.state.currentUser.EmlAddrssVld,
      NickName: this.state.currentUser.NickName,
      AnonymusStat: this.state.currentUser.AnonymusStat,
      published: status,
    };

    UserDataService.update(this.state.currentUser.UserID, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentUser: {
            ...prevState.currentUser,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
      this.state.currentUser.UserID,
      this.state.currentUser
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.UserID)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="UserFullName">UserFullName</label>
                <input
                  type="text"
                  className="form-control"
                  id="UserFullName"
                  value={currentUser.UserFullName}
                  onChange={this.onChangeUserFullName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="Password"
                  value={currentUser.Password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="form-group">
                <label htmlFor="EmailAddress">EmailAddress</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmailAddress"
                  value={currentUser.EmailAddress}
                  onChange={this.onChangeEmailAddress}
                />
              </div>

              <div className="form-group">
                <label htmlFor="EmlAddrssVld">EmlAddrssVld</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmlAddrssVld"
                  value={currentUser.EmlAddrssVld}
                  onChange={this.onChangeEmlAddrssVld}
                />
              </div>

              <div className="form-group">
                <label htmlFor="NickName">NickName</label>
                <input
                  type="text"
                  className="form-control"
                  id="NickName"
                  value={currentUser.NickName}
                  onChange={this.onChangeNickName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="AnonymusStat">AnonymusStat</label>
                <input
                  type="text"
                  className="form-control"
                  id="AnonymusStat"
                  value={currentUser.AnonymusStat}
                  onChange={this.onChangeAnonymusStat}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentUser.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
