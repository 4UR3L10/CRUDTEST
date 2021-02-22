module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new users
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single user with UserID
  router.get("/:UserID", users.findOne);

  // Update a user with UserID
  router.put("/:UserID", users.update);

  // Delete a user with UserID
  router.delete("/:UserID", users.delete);

  // delete all users
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
