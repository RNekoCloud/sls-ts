import { Express } from "express";
const serverless = require("serverless-http");
const express = require("express");
const app: Express = express();
const bodyParser = require("body-parser");

// Setup Routes and Controller
import TodoController from "./controller/TodoController";
import TodoRoutes from "./routes/TodoRoute";

const todoController = new TodoController();
const todoRoutes = new TodoRoutes(todoController);

// Setup parser
app.use(bodyParser.json())

todoRoutes.setup(app);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
