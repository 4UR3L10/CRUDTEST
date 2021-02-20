const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.UserFullName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a user
  const user = {
    UserFullName: req.body.UserFullName,
    Password: req.body.Password,
    EmailAddress: req.body.EmailAddress,
    EmlAddrssVld: req.body.EmlAddrssVld,
    NickName: req.body.NickName,
    AnonymusStat: req.body.AnonymusStat,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const UserFullName = req.query.UserFullName;
  var condition = UserFullName
    ? { UserFullName: { [Op.like]: `%${UserFullName}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Find a single User with an UserID
exports.findOne = (req, res) => {
  const UserID = req.params.UserID;

  User.findByPk(UserID)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Update a User by the UserID in the request
exports.update = (req, res) => {
  const UserID = req.params.UserID;

  User.update(req.body, {
    where: { UserID: UserID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated sucessfully.",
        });
      } else {
        res.send({
          message:
            " Cannot update User with UserID=${UserID}. Maybe User was not found or req.body is empty",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with UserID=" + UserID,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const UserID = req.params.UserID;

  User.destroy({
    where: { UserID: UserID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted sucessfully.",
        });
      } else {
        res.send({
          message:
            " Cannot delete User with UserID=${UserID}. Maybe User was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with UserID=" + UserID,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: "${nums} Users were deleted sucessfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { AnonymusStat: "Y" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retreaving users.",
      });
    });
};
