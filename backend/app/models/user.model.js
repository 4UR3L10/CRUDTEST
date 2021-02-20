module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    UserFullName: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    EmailAddress: {
      type: Sequelize.STRING,
    },
    EmlAddrssVld: {
      type: Sequelize.STRING,
    },
    NickName: {
      type: Sequelize.STRING,
    },
    AnonymusStat: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
