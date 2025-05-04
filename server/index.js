const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const toDoModel = require("./Model/Todo.js");
require("dotenv").config();

// Allow CORS for frontend URL
app.use(
  cors({
    origin: ["https://mern-deploy-frontend-two.vercel.app"], // Allowing specific frontend
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Set Content Security Policy to allow external stylesheets (e.g., JSDelivr for Ant Design CSS)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; style-src 'self' https://cdn.jsdelivr.net; script-src 'self';"
  );
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.get("/get", (req, res) => {
  toDoModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  toDoModel
    .create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  toDoModel
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  toDoModel
    .deleteOne({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Server listen
app.listen(3001, () => {
  console.log("Server running at port no: 3001");
});
