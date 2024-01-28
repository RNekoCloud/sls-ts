import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { Dyno } from "../config/dyno";

interface Todo {
    todo_id: string,
    title: string,
    status: string,
}

class TodoService {
    dyno: Dyno

    constructor(dyno: Dyno) {
        this.dyno = dyno;
    };

    async findAll(): Promise<any> {
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