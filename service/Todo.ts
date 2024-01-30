export interface Todo {
    id: string,
    title: string,
    status: string,
}

// Result query of DynamoDB
export interface RawTodo {
    id: {
        S: string
    },
    title: {
        S: string,
    },
    status: {
        S: string,
    }
}