var bcrypt = require("bcrypt");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "please enter a valid email"
        }
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{

        len:{
          args:[6],
          msg: "please enter at least 6 characters"
        }
      }
    }
  });

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
