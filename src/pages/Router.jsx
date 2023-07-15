import React from "react";
import Sidebar from "../components/Sidebar";
import StockPage from "./StockPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import ProductModel from "./ProductModel";
import ProductModelDetail from "./ProductModelDetail";

function HomePage() {
  return (
    <BrowserRouter>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-full">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/stock" element={<StockPage />}></Route>
            <Route path="/productModel" element={<ProductModel />}></Route>
            <Route
              path="/productModelDetail/:id"
              element={<ProductModelDetail />}
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HomePage;
