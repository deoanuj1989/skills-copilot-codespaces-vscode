// Create a web server
// 1. GET /comments - returns all comments
// 2. POST /comments - create a new comment
// 3. GET /comments/:id - return single comment
// 4. PUT /comments/:id - update single comment
// 5. DELETE /comments/:id - delete single comment

const express = require("express");
const app = express();
const Joi = require("joi");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const comments = require("./comments");
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

// Create a custom middleware
app.use((req, res, next) => {
  console.log("Hello from middleware");
  next();
});

// Create a custom middleware
app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

// GET /comments - returns all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// POST /comments - create a new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
  };
  comments.push(comment);
  res.json(comment);
});

// GET /comments/:id - return single comment
app.get("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  } else {
    res.json(comment);
  }
});

// PUT /comments/:id - update single comment
app.put("/comments/:id", (req, res) => {
  const comment = comments.find((comment) => comment.id === req.params.id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  } else {
    comment.name = req.body.name;
    comment.comment = req.body;
    res.json(comment);
    }
});



