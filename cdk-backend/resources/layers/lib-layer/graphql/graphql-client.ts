import * as https from "https";
import { Endpoint, HttpRequest } from "aws-sdk";

const region = process.env.AWS_REGION || "eu-west-1";

interface GraphQLParams {
  readonly query: any;
  readonly operationName?: string;
  readonly variables?: any;
}

const graphqlOperation = async (params: GraphQLParams) => {
  const endpoint = getGraphQLEndpoint();
  const req = new HttpRequest(endpoint, region);

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint.host;
  req.headers["Content-Type"] = "application/json";
  req.headers["x-api-key"] = getAPIKey();
  req.body = JSON.stringify(params);

  return await request(req);
};

function getGraphQLEndpoint(): Endpoint {
  const appsyncUrl = process.env.API_GRAPHQLAPIENDPOINT || "";

  if (!appsyncUrl) {
    throw new Error("Missing AppSync URL Environment Variable");
  }

  return new Endpoint(appsyncUrl);
}

function getAPIKey(): string {
  const apiKey = process.env.API_GRAPHQLAPIKEY || "";

  if (!apiKey) {
    throw new Error("Missing API Key Environment Variable");
  }

  return apiKey;
}

function request(req: HttpRequest): Promise<any> {
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

export default graphqlOperation;
