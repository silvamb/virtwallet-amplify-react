process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";
process.env.API_GRAPHQLAPIENDPOINT = "https://myapi.appsync-api.eu-west-1.amazonaws.com";
process.env.API_GRAPHQLAPIKEY = "apiKey";

import * as nock from 'nock';
import graphqlOperation  from '../resources/layers/lib-layer/graphql/graphql-client';
import { listAccounts } from '../resources/layers/lib-layer/graphql/queries';
import { ListAccountsQuery } from '../resources/layers/lib-layer/graphql/API';

test('invoke query from graphql', async () => {

  const expectedResponse = {
    listAccounts: {
      items: [{
        id: "accountID",
        ownerId: "Owner",
        name: "accountName",
        createdAt: "2021-06-19 19:32:22",
      }]
    }
  };

  nock("https://myapi.appsync-api.eu-west-1.amazonaws.com").post("/graphql").reply(200, expectedResponse);

  const data = await graphqlOperation({
    query: listAccounts,
  }) as ListAccountsQuery;

  expect(data).toEqual(expectedResponse);
});