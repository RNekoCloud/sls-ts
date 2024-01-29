import { Request, Response, NextFunction } from "express";
import TodoService from "../service/TodoService";
import { Local } from "../config/dyno";

class TodoController  {
    public async getAll(req: Request, res: Response, next: NextFunction ): Promise<Response> {
        let service: TodoService = new TodoService(Local)
        const result = await service.findAll();

        return res.json({
            code: 200,
            todo: result,
        }).status(200)
    }
}

export default TodoController;