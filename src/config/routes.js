/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const ErrorPage = lazy(() => import('../components/pages/ErrorPage'))

const ListAccount = lazy(() => import('../pages/Account/ListAccounts'))
const ViewAccount = lazy(() => import('../pages/Account/ViewAccount'))
const NewAccount = lazy(() => import('../pages/Account/NewAccount'))

const ListWallets = lazy(() => import('../pages/Wallet/ListWallets'))
const ViewWallet = lazy(() => import('../pages/Wallet/ViewWallet'))
const NewWallet = lazy(() => import('../pages/Wallet/NewWallet'))
const WalletDashboard = lazy(() => import('../pages/Wallet/WalletDashboard'))

const ListCategories = lazy(() => import('../pages/Category/ListCategories'))
const NewCategory = lazy(() => import('../pages/Category/NewCategory'))
const ViewCategory = lazy(() => import('../pages/Category/ViewCategory'))

const ListKeywordRules = lazy(() => import('../pages/KeywordRules/ListKeywordRules'))
const NewKeywordRule = lazy(() => import('../pages/KeywordRules/NewKeywordRule'))
const ViewKeywordRule = lazy(() => import('../pages/KeywordRules/ViewKeywordRule'))

const ListExpressionRules = lazy(() => import('../pages/ExpressionRule/ListExpressionRules'))
const NewExpressionRule = lazy(() => import('../pages/ExpressionRule/NewExpressionRule'))
const ViewExpressionRule = lazy(() => import('../pages/ExpressionRule/ViewExpressionRule'))

const ListTransactions = lazy(() => import('../pages/Transaction/ListTransactions'))
const ViewTransaction = lazy(() => import('../pages/Transaction/ViewTransaction'))

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute path="/signup" redirectTo="/" exact component={SignUp} />,
  <UnauthorizedRoute
    path="/password_reset"
    redirectTo="/"
    exact
    component={PasswordReset}
  />,
  <Route path="/about" exact component={About} />,
  <Route path="/error" exact component={ErrorPage} />,
  <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/accounts" exact component={ListAccount} />,
  <AuthorizedRoute path="/account/create" exact component={NewAccount} />,
  <AuthorizedRoute path="/account/:accountId" exact component={ViewAccount} />,
  <AuthorizedRoute path="/account/:accountId/wallets" exact component={ListWallets} />,
  <AuthorizedRoute path="/wallets" exact component={ListWallets} />,
  <AuthorizedRoute path="/account/:accountId/wallet/create" exact component={NewWallet} />,
  <AuthorizedRoute path="/wallet/:walletId" exact component={ViewWallet} />,
  <AuthorizedRoute path="/account/:accountId/wallet/:walletId/dashboard" exact component={WalletDashboard}/>,
  <AuthorizedRoute path="/account/:accountId/categories" exact component={ListCategories} />,
  <AuthorizedRoute path="/account/:accountId/category/create" exact component={NewCategory} />,
  <AuthorizedRoute path="/category/:categoryId" exact component={ViewCategory} />,
  <AuthorizedRoute path="/account/:accountId/keywordrules" exact component={ListKeywordRules} />,
  <AuthorizedRoute path="/account/:accountId/keywordrule/create" exact component={NewKeywordRule} />,
  <AuthorizedRoute path="/keywordrule/:keywordRuleId" exact component={ViewKeywordRule} />,
  <AuthorizedRoute path="/account/:accountId/expressionrules" exact component={ListExpressionRules} />,
  <AuthorizedRoute path="/account/:accountId/expressionrule/create" exact component={NewExpressionRule} />,
  <AuthorizedRoute path="/expressionrule/:expressionRuleId" exact component={ViewExpressionRule} />,
  <AuthorizedRoute path="/account/:accountId/wallet/:walletId/transactions" exact component={ListTransactions} />,
  <AuthorizedRoute path="/account/:accountId/wallet/:walletId/transaction/:date/:transactionId" exact component={ViewTransaction} />,
]

export default routes
