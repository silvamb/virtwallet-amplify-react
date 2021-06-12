import { API, graphqlOperation } from 'aws-amplify'

import { listAccounts } from '../graphql/queries'
import { createAccount, deleteAccount, updateAccount } from '../graphql/mutations'

export const getAccountDetails = /* GraphQL */ `
  query GetAccountDetails($id: ID!) {
    getAccount(id: $id) {
      id
      name
      description
      ownerId
      monthStartDateRule {
        dayOfMonth
        currentMonth
      }
    }
  }
`;

export const list = async ({userId}) => {

    console.log("Retrieving accounts from user", userId);

    try {
        const { data } = await API.graphql(graphqlOperation(listAccounts));
        const accounts = data.listAccounts.items;
        console.log("Account Data", accounts);
        return accounts;
    } catch(err) {
        console.log("Error retrieving accounts", err);
        throw new Error("Error retrieving accounts");
    }
}

export const create = async (accountDetails) => {
  console.log("Creating account", accountDetails);
  try {
      const { data } = await API.graphql({ query: createAccount, variables: {input: accountDetails}});
      console.log("Create Account Data", data);
      return data.createAccount;
  } catch(err) {
      console.log("Error creating account", err);
      throw new Error("Error creating account");
  }
}

export const retrieve = async (accountId) => {
    console.log("Retrieving account details", accountId);

    try {
        const { data } = await API.graphql({ query: getAccountDetails, variables: {id: accountId}});
        console.log("Account Data", data);
        return data.getAccount;
    } catch(err) {
        console.log("Error retrieving accounts", err);
        throw new Error("Error retrieving accounts");
    }
}

export const save = async (accountId, details) => {
  console.log("Saving account", accountId, "details", details);

  const accountDetails = {id: accountId, ...details};

  try {
      const { data } = await API.graphql({ query: updateAccount, variables: {input: accountDetails}});
      console.log("Updated Data", data);
      return data.updateAccount;
  } catch(err) {
      console.log("Error updating account", err);
      throw new Error("Error updating account");
  }
}

export const remove = async (accountId) => {
  console.log("Deleting account", accountId);

  const deleteAccountInput = {id: accountId};

  try {
      const { data } = await API.graphql({ query: deleteAccount, variables: {input: deleteAccountInput}});
      console.log("Delete Account Result", data);
      return data.deleteAccount;
  } catch(err) {
      console.log("Error deleting account", err);
      throw new Error("Error deleting account");
  }
}
