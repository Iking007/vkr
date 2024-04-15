import Header from "./elements/blooks/Header";
import {Link, Route, Routes } from "react-router-dom";
// import Goods from "./elements/pages/Goods";
import Index from "./elements/pages/Index";
import Query from "./elements/pages/Query";
import Login from "./elements/pages/Login";
import Profile from "./elements/pages/Profile";
import Reg from "./elements/pages/Reg";
import Users from "./elements/pages/Users";
import AddCategory from "./elements/pages/AddCategory";
import AddProduct from "./elements/pages/AddProduct";
import Goods from "./elements/pages/Goods";
import Product from "./elements/pages/Product";
import Category from "./elements/pages/Category";
import Cart from "./elements/pages/Cart";
import Ads from "./elements/pages/Ads";
import Ad from "./elements/pages/Ad";
import AddAd from "./elements/pages/AddAd";
import Payment from "./elements/pages/Payment";
import Order from "./elements/pages/Order";
import MyOrders from "./elements/pages/MyOrders";
import AddAddress from "./elements/pages/AddAddress";
import Orders from "./elements/pages/Orders";

function App() {
  return (
    <div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"/>
      <link rel="icon" href="https://digitalreviewboss.com/wp-content/uploads/2020/08/7-1.png"/>
      <Header/>
      <Routes>
        <Route path="/" element={Index()}/>
        <Route path="/goods" element={Goods()}/>
        <Route path="/goods/query/:id" element={Query()}/>
        <Route path="/product/:id" element={Product()}/>
        <Route path="/edit/product/:id" element={AddProduct()}/>
        <Route path="/add/product" element={AddProduct()}/>
        <Route path="/reg" element={Reg()}/>
        <Route path="/login" element={Login()}/>
        <Route path="/prof" element={Profile()}/>
        <Route path="/users" element={Users()}/>
        <Route path="/add/category" element={AddCategory()}/>
        <Route path="/categories" element={Category()}/>
        <Route path="/mycart" element={Cart()}/>
        <Route path="/ads" element={Ads()}/>
        <Route path="/ad/:id" element={Ad()}/>
        <Route path="/add/ad" element={AddAd()}/>
        <Route path="/edit/ad" element={AddAd()}/>
        <Route path="/payment" element={Payment()}/>
        <Route path="/order/:id" element={Order()}/>
        <Route path="/myorders" element={MyOrders()}/>
        <Route path="/add/address" element={AddAddress()}/>
        <Route path="/edit/address" element={AddAddress()}/>
        <Route path="/orders" element={Orders()}/>
        <Route path="/orders/processed" element={Orders()}/>
        <Route path="/orders/unprocessed" element={Orders()}/>
      </Routes>
    </div>
  );
}

export default App;
