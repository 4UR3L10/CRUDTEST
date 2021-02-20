import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(UserID) {
    return http.get(`/users/${UserID}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(UserID, data) {
    return http.put(`/users/${UserID}`, data);
  }

  delete(UserID) {
    return http.delete(`/users/${UserID}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByUserFullName(UserFullName) {
    return http.get(`/users?UserFullName=${UserFullName}`);
  }
}

export default new UserDataService();
