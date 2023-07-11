import React, { useEffect } from "react";
import ProductModelHeader from "../components/ProductModelHeader";
import { useDispatch, useSelector } from "react-redux";
import { getProductModelAsync } from "../feature/product/Slice/productSlice";

function ProductModel() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductModelAsync());
    console.log("running");
  }, []);
  const productModels = useSelector((state) => state.product.productModels);
  console.log("productModels", productModels);
  console.log("test");
  return (
    <>
      <ProductModelHeader></ProductModelHeader>
      <div className="overflow-x-auto w-[1280px] mx-[120px] mt-[60px]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Product Name
              </th>
              {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Product Description
              </th> */}
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
              <tbody className=" divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {el.name}
                  </td>
                  {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {el.description}
                  </td> */}
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {el.discount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {el.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {el.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {el.gender}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <div className="flex gap-5">
                      <button
                        href="#"
                        className="flex gap-2 justify-center items-center rounded bg-gray-100 px-4 py-2 text-xs font-medium text-black hover:bg-gray-200 duration-300"
                      >
                        <i class="fa-regular fa-pen-to-square text-gray-500"></i>
                        <p> Edit</p>
                      </button>
                      <button
                        href="#"
                        className="flex gap-2 justify-center items-center rounded bg-red-400 px-4 py-2 text-xs font-medium text-white  duration-300 hover:bg-red-500"
                      >
                        <i class="fa-regular fa-trash-can text-white"></i>
                        <p> Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default ProductModel;
