const Todos = require("../models/todo.model");

module.exports = {
  create(todo) {
    const todoDoc = new Todos(todo);
    return todoDoc.save();
  },
  getAll(userId) {
    return Todos.find({ userId: userId });
  },
  getById(id, userId) {
    return Todos.findOne({ _id: id, userId: userId });
  },
  update(id, userId, data) {
    return Todos.findOneAndUpdate(
      { _id: id, userId: userId },
      { $set: data },
      {
        new: true
      }
    );
  },
  delete(id, userId) {
    return Todos.findOneAndDelete({ _id: id, userId: userId }).then(
      response => {
        if (!response) {
          throw new Error("NOTFOUND");
        }
        return response;
      }
    );
  }
};
