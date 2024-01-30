import { Request, Response, NextFunction } from "express";
import TodoService from "../service/TodoService";
import { Local } from "../config/dyno";
import { Todo } from "../service/Todo";
import { nanoid } from "nanoid";

class TodoController  {
    public async getAll(req: Request, res: Response, next: NextFunction ): Promise<Response> {
        let service: TodoService = new TodoService(Local)
        const result = await service.findAll();

        return res.json({
            code: 200,
            todo: result,
        }).status(200)
    }

    public async save(req: Request, res: Response, next: NextFunction): Promise<Response> {
        let service: TodoService = new TodoService(Local)
        const data: Todo = {
            id: nanoid(),
            title: req.body.title,
            status: req.body.status,
        }

        await service.create(data)

        return res.json({
            code: 201,
            message: "Berhasil menambahkan data todo",
        }).status(201)
    }
}

export default TodoController;