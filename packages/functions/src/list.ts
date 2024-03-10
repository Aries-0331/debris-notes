import {Table} from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamoDb";

export const main = handler(async (event) => {
    const params = {
        TableName: Table.Notes.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };

    const result = await dynamoDb.query(params);
    return JSON.stringify(result.Items);
});