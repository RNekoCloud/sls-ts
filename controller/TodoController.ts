import { Request, Response } from "express";
import TodoService from "../service/TodoService";

class TodoController {
    service: TodoService;

    constructor(service: TodoService) {
        this.service = service;
    }

    async getAll(req: Request, res: Response) {
        const todoService = this.service;
        const result = await todoService.findAll()

        return res.json({
            code: 200,
            todo: result,
        }).status(200)
    }
}