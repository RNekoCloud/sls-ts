import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Dyno } from "../config/dyno";
import { Todo } from "./Todo";
import { nanoid } from "nanoid";

class TodoService {
    dyno: Dyno;

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

    async create(data: Todo) {
        const table = this.dyno.tableName;
        const client = this.dyno.client;

        const cmd = new PutItemCommand({
            TableName: table,
            Item: {
                "id": {
                    S: nanoid(),
                },
                "title": {
                    S: data.title,
                },
                "status": {
                    S: data.status,
                },
            },
        });

        await client.send(cmd)
    }

};

export default TodoService;