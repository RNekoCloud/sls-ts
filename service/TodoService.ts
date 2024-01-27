import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Request } from "express";
import { Dyno } from "../config/dyno";

interface Todo {
    todo_id: string,
    title: string,
    status: string,
}

class TodoService {
    body: Request["body"];
    params: Request["params"]
    dyno: Dyno

    constructor(req: Request, dyno: Dyno) {
        this.body = req.body;
        this.params = req.params;
        this.dyno = dyno;
    };

    getAll = async() =>  {
        const table = this.dyno.tableName;
        const client = this.dyno.client;

        const cmd = new ScanCommand({
            TableName: table
        });

        const response = await client.send(cmd);
        return response.Items;
    };

};

export default TodoService;