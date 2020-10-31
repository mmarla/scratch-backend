import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params) => dynamoDb.get(params).promise(),
  put: (params) => dynamoDb.put(params).promise(),
  query: (params) => dynamoDb.query(params).promise(),
  update: (params) => dynamoDb.update(params).promise(),
  delete: (params) => dynamoDb.delete(params).promise(),
};
