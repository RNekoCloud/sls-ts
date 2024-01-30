import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Dyno } from "../config/dyno";
import { RawTodo, Todo } from "./Todo";

class TodoService {
    dyno: Dyno;

    constructor(dyno: Dyno) {
        this.dyno = dyno;
    };

    async findAll(): Promise<Todo[]> {
        // Setup DynamoDB Config
        const table = this.dyno.tableName;
        const client = this.dyno.client;

        // Executing Scan Query
        const cmd = new ScanCommand({
            TableName: table
        });
        const response = await client.send(cmd);

        // Convert result of execution query into interface
        let result: Todo[] = []
        const rawData = response as unknown as RawTodo[];
        rawData.forEach(el => {
            // Get field object in Raw Data Query DynamoDB
            const { id, title, status } = el
            // Push the raw data into new array
            let todo: Todo = {
                id: id.S,
                title: title.S,
                status: status.S,
            };

            result.push(todo)
            
        })

        // Return response
        return result;
    };

    async create(data: Todo) {
        const table = this.dyno.tableName;
        const client = this.dyno.client;

        const cmd = new PutItemCommand({
            TableName: table,
            Item: {
                "id": {
                    S: data.id,
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