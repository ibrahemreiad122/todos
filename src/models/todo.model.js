const mongoose = require("mongoose"),
  schema = mongoose.Schema,
  types = schema.Types;
const todoSchema = new schema({
  title: { type: types.String, required: true },
  subject: { type: types.String, required: true },
  completed: { type: types.Boolean, default: false },
  date: { type: types.Number, default: Date.now },
  userId: { type: types.ObjectId, ref: "user" }
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
