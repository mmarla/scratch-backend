import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const buildResponse = (statusCode, body) => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  statusCode,
  body: JSON.stringify(body),
});

export const main = (
  {
    requestContext: {
      identity: { cognitoIdentityId },
    },
    body,
  },
  _,
  callback
) => {
  const { content, attachment } = JSON.parse(body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: cognitoIdentityId,
      noteId: uuid.v1(),
      content,
      attachment,
      createdAt: Date.now(),
    },
  };

  dynamoDb.put(params, (error, _) => {
    if (error) {
      return callback(null, buildResponse(500, { status: false }));
    }

    return callback(null, buildResponse(200, params.Item));
  });
};
