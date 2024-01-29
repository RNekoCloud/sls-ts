import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface Dyno {
    client: DynamoDBClient,
    tableName: string, 
}

export const Local: Dyno = {
    client: new DynamoDBClient({
        endpoint: "http://localhost:8000"
    }),
    tableName: "todo_v2"
}