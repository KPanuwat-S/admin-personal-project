import React from "react";
import StockHeader from "../components/StockHeader";
import StockItem from "../components/StockItem";

function StockPage() {
  return (
    <div className="w-[1280px]">
      <div>
        <StockHeader />
      </div>
      <div className="flex gap-10 p-5 px-10">
        <p className="flex-1">PRODUCT</p>
        <p className="flex-1">STOCK</p>
        <p>PRICE UNIT</p>
      </div>
      <div className="px-10">
        <StockItem />
      </div>
    </div>
  );
}

export default StockPage;
