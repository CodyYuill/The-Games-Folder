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
    },
  } 
);

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};


// module.exports.login = async function(email, password) {

//   const user = await this.findOne({ email });
//   if(user){
//     const auth = bcrypt.compareSync(password, this.password);
//     if(auth) {
//       return user;
//     } throw Error("incorrect password");
//   }throw Error("incorrect email");
//  // return bcrypt.compareSync(password, this.password);
// };
