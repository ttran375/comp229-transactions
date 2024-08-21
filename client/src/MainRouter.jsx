import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Profile from "./components/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import EditProfile from "./components/EditProfile.jsx";
import MyShops from "./components/MyShops";
import NewShop from "./components/NewShop";
import EditShop from "./components/EditShop";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
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
          path="/seller/shops"
          element={
            <PrivateRoute>
              <MyShops />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/shop/new"
          element={
            <PrivateRoute>
              <NewShop />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/shop/edit/:shopId"
          element={
            <PrivateRoute>
              <EditShop />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/:shopId/products/new"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
          component={NewProduct}
        />
        <Route
          path="/seller/:shopId/:productId/edit"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;
