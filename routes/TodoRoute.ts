import { Express } from "express";
import TodoController from "../controller/TodoController";

class TodoRoutes {
    controller: TodoController;

    constructor(controller: TodoController) {
        this.controller = controller;
    }

    setup(router: Express) {
        router.get("/api/v1/todo", this.controller.getAll);
        router.post("/api/v1/todo",  this.controller.save);
    }
};

export default TodoRoutes;