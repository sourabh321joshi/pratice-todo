const express = require("express");
const { connectionDB, TodoSchema } = require("./config/db");
const app = express();

app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    const data = req.body;

    const val = await TodoSchema.create(data);
    res.status(201).send({ message: "todo created successfully", val });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get("/read", async (req, res) => {
  const data = await TodoSchema.find({});
  res.send(data);
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await TodoSchema.findByIdAndDelete(id);
    res.send("todo deleted successfully");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { completed } = req.body;   // dynamic value true/false

    const updatedTodo = await TodoSchema.findByIdAndUpdate(
      id,
      { completed },   // dynamic update
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


connectionDB()
  .then(() => {
    console.log("database connection established successfully");
    app.listen(3000, () => {
      console.log("app is running ");
    });
  })
  .catch(() => {
    console.log("error connecting to the Db");
  });
