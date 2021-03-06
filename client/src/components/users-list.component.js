import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchUserFullName = this.onChangeSearchUserFullName.bind(
      this
    );
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchUserFullName = this.searchUserFullName.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUserFullName: "",
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUserFullName(e) {
    const searchUserFullName = e.target.value;

    this.setState({
      searchUserFullName: searchUserFullName,
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then((response) => {
        this.setState({
          users: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchUserFullName() {
    UserDataService.findByUserFullName(this.state.searchUserFullName)
      .then((response) => {
        this.setState({
          users: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchUserFullName, users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by UserFullName"
              value={searchUserFullName}
              onChange={this.onChangeSearchUserFullName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUserFullName}
              >
                Search UserFullName
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.UserFullName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All Users
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>UserFullName:</strong>
                </label>{" "}
                {currentUser.UserFullName}
              </div>
              <div>
                <label>
                  <strong>NickName:</strong>
                </label>{" "}
                {currentUser.NickName}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentUser.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/users/" + currentUser.UserID}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
