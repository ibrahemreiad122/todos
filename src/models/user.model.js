const mongoose = require("mongoose"),
  bcryptjs = require("bcryptjs"),
  validator = require("validator"),
  _ = require("lodash");
(schema = mongoose.Schema), (types = schema.Types);

const userSchema = new schema({
  email: {
    type: types.String,
    unique: true,
    required: true,
    minlength: 12,
    validate: {
      validator: email => validator.isEmail(email),
      message: prop => `${prop.value} is not a valid email`
    }
  },
  name: {
    type: types.String,
    required: [true, "name is required"]
  },
  password: { type: types.String, required: true }
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  return _.omit(userObject, ["password"]);
};

userSchema.pre("save", function(next) {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
