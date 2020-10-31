import * as uuid from "uuid";
import handler from "./libs/handler";
import dynamoDb from "./libs/dynamodb";

const lambda = async (event, _) => {
  const { content, attachment } = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content,
      attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
};

export const main = handler(lambda);
