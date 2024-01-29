import { Express } from "express";
import TodoController from "../controller/TodoController";

class TodoRoutes {
    controller: TodoController;

    constructor(controller: TodoController) {
        this.controller = controller;
    }

    setup(router: Express) {
        router.get("/api/v1/todo", this.controller.getAll);
    }
};

export default TodoRoutes;