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
        <Route path="/add/product" element={AddProduct()}/>
        <Route path="/reg" element={Reg()}/>
        <Route path="/login" element={Login()}/>
        <Route path="/prof" element={Profile()}/>
        <Route path="/users" element={Users()}/>
        <Route path="/add/category" element={AddCategory()}/>
        <Route path="/categories" element={Category()}/>
        <Route path="/mycart" element={Cart()}/>
        
      </Routes>
    </div>
  );
}

export default App;