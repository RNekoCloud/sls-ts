import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const Dyno = new DynamoDBClient({
    // Setup local DynamoDB
    endpoint: "http://localhost:8000"
})