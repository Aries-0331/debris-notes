import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamoDb";

export const main = handler(async (event) => {
  let data = {
    content: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(),
      content: data.content,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);
  return JSON.stringify(params.Item);
});
