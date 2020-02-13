const User = require("../models/user.model");
const bcryptjs = require("bcryptjs"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken");
module.exports = {
  register(email, name, password) {
    const user = new User({
      email: email,
      name: name,
      password: password
    });
    return user.save();
  },
  login(email, password) {
    return User.findOne({ email: email }).then(user => {
      console.log(user);
      if (!user) throw new Error("wrong user name or password");
      const result = bcryptjs.compareSync(password, user.password);
      if (result) {
        const token = jwt.sign(user.toJSON(), "test", {
          expiresIn: "1day"
        });
        return { token, user };
      }
      //_.pick(user, ["email", "name", "_id"]);
      throw new Error("wrong user name or password");
    });
  }
};
