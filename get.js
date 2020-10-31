import handler from "./libs/handler";
import dynamoDb from "./libs/dynamodb";

export const main = handler(async (event, context) => {
  const { requestContext, pathParameters } = event;
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: requestContext.identity.cognitoIdentityId,
      noteId: pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
