import React from "react";
import Sidebar from "../components/Sidebar";
import StockPage from "./StockPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HomePage;
