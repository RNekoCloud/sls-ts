const serverless = require("serverless-http");
const express = require("express");
const app = express();

import { Local } from "./config/dyno"
import TodoRoutes from "./routes/TodoRoute";
import TodoService from "./service/TodoService";
import TodoController from "./controller/TodoController";

// Dependency injection
const todoService = new TodoService(Local);
const todoController = new TodoController(todoService);
const todoRoutes = new TodoRoutes(todoController)

// Initialize routes
todoRoutes.setup(app)

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
