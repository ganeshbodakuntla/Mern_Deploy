const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false,
  },
});

const toDoModel = mongoose.model("todolist", toDoSchema);
module.exports = toDoModel;
