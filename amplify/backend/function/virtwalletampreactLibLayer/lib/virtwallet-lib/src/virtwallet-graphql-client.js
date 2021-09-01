const https = require("https");
const AWS = require("aws-sdk");

const region = process.env.REGION || "eu-west-1";

exports.graphqlOperation = async ({query, operationName, variables}) => {
  const endpoint = getGraphQLEndpoint();
  const req = new AWS.HttpRequest(endpoint, region);

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint.host;
  req.headers["Content-Type"] = "application/json";
  req.headers["x-api-key"] = getAPIKey();
  req.body = JSON.stringify({query, operationName, variables});

  return await request(req);
};

function getGraphQLEndpoint() {
  const appsyncUrl = process.env.API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT || "";

  if (!appsyncUrl) {
    throw new Error("Missing AppSync URL Environment Variable");
  }

  return new AWS.Endpoint(appsyncUrl);
}

function getAPIKey() {
  const apiKey = process.env.API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT || "";

  if (!apiKey) {
    throw new Error("Missing API Key Environment Variable");
  }

  return apiKey;
}

function request(req) {
  return new Promise((resolve) => {
    const httpRequest = https.request({...req, host: req.endpoint.hostname}, (result) => {
      let data = "";

      result.on("data", (chunk) => {
        data += chunk;
      });

      result.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
}

class GraphQLError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = "GraphQLError";
    this.errors = errors;
  }
}

exports.GraphQLError = GraphQLError;
