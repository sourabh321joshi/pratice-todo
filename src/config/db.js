const mongoose = require("mongoose");

const connectionDB = async () => {
  mongoose.connect(
    "mongodb+srv://sourabh-20:1C4RnPMg5CLDbXcq@namastenode.ksoxg.mongodb.net/todo-999"
  );
};

const todoSchema = new mongoose.Schema({
  title: String,
  body: String,
  completed: Boolean,
});

const TodoSchema = mongoose.model("Todo", todoSchema);

module.exports = { connectionDB, TodoSchema };
