import React, { useEffect, useState } from "react";
import ProductModelHeader from "../components/ProductModelHeader";
import { useDispatch, useSelector } from "react-redux";
import { getProductModelAsync } from "../feature/product/Slice/productSlice";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import ProductModelRow from "./ProductModelRow";
import { Collapse } from "react-collapse";
import Loading from "../components/Loading";

function ProductModel() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showProductItems, setShowProductItems] = useState(false);
  useEffect(() => {
    dispatch(getProductModelAsync());
    console.log("running");
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const productModels = useSelector((state) => state.product.productModels);
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="bg-[#F2F3F5] w-full h-screen">
      <ProductModelHeader></ProductModelHeader>
      <div className="rounded-xl bg-white overflow-x-auto w-[1080px] mx-[120px] p-5 mt-[60px]">
        <table className="max-h-[820px] overflow-y-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Product Name
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Discount 
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Gender
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          {productModels.map((el) => {
            return (
              // divide-gray-200
              <tbody className=" ">
                <ProductModelRow
                  onClick={() => {
                    setShowProductItems(true);
                  }}
                  key={el.id}
                  el={el}
                ></ProductModelRow>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default ProductModel;
