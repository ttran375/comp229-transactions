import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Profile from "./components/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EditProfile from "./components/EditProfile.jsx";
import MyAccounts from "./components/MyAccounts.jsx";
import NewAccount from "./components/NewAccount.jsx";
import EditAccount from "./components/EditAccount.jsx";
import MyTransactions from "./components/MyTransactions.jsx";
import NewTransaction from "./components/NewTransaction.jsx";
import Menu from "./components/Menu";

function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
        <Route
          path="/accounts"
          element={
            <PrivateRoute>
              <MyAccounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/new"
          element={
            <PrivateRoute>
              <NewAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/edit/:accountId"
          element={
            <PrivateRoute>
              <EditAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/:accountId/transactions"
          element={
            <PrivateRoute>
              <MyTransactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction/new"
          element={
            <PrivateRoute>
              <NewTransaction />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;
