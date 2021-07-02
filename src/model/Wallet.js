import { API } from 'aws-amplify'

import { createWallet, deleteWallet, updateWallet } from '../graphql/mutations'

export const listWalletsbyAccount = /* GraphQL */ `
query ListWalletsFromAccount($filter: ModelWalletFilterInput) {
  listWallets(filter: $filter) {
    items {
      accountId
      id
      name
      description
      account {
        name
      }
    }
  }
}
`;

export const getWalletDetails = /* GraphQL */ `
query GetWalletDetails($id: ID!) {
  getWallet(id:$id) {
    accountId
    id
    name
    description
    ownerId
    balance
    type
    statementParserId
  }
}
`;

export const list = async (accountId) => {

  console.log("Retrieving wallets for account", accountId);

  const filter = accountId ? {accountId: {eq: accountId}} : undefined;

  try {
      const { data } = await API.graphql({ query: listWalletsbyAccount, variables: {filter}});

      const wallets = data.listWallets.items;
      console.log("Wallet Data", wallets);
      return wallets;
  } catch(err) {
      console.log("Error retrieving wallets", err);
      throw new Error("Error retrieving Wallets");
  }
}

export const retrieve = async (walletId) => {

  console.log("Retrieving wallet details", walletId);

  try {
      const { data } = await API.graphql({ query: getWalletDetails, variables: {id: walletId}});
      console.log("Wallet Data", data);
      return data.getWallet;
  } catch(err) {
      console.log("Error retrieving wallet details", err);
      throw new Error("Error retrieving Wallet details");
  }

}

export const update = async (walletId, details) => {
  console.log("Updating wallet", walletId, "details", details);

  const walletDetails = {id: walletId, ...details};

  try {
      const { data } = await API.graphql({ query: updateWallet, variables: {input: walletDetails}});
      console.log("Updated Data", data);
      return data.updateWallet;
  } catch(err) {
      console.log("Error updating wallet", err);
      throw new Error("Error updating Wallet");
  }
}

export const remove = async (walletId) => {

  console.log("Deleting wallet", walletId);

  const deleteWalletInput = {id: walletId};

  try {
      const { data } = await API.graphql({ query: deleteWallet, variables: {input: deleteWalletInput}});
      console.log("Delete Wallet Result", data);
      return data.deleteWallet;
  } catch(err) {
      console.log("Error deleting wallet", err);
      throw new Error("Error deleting wallet");
  }

}

export const create = async (walletDetails) => {
  console.log("Creating wallet", walletDetails);
  try {
      const { data } = await API.graphql({ query: createWallet, variables: {input: walletDetails}});
      console.log("Create Wallet Data", data);
      return data.createWallet;
  } catch(err) {
      console.log("Error creating wallet", err);
      throw new Error("Error creating wallet");
  }
}