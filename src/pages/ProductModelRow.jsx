import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ProductModelForm from "../components/ProductModelForm";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import * as transformData from "../utils/transform";
import { useDispatch } from "react-redux";
import { deleteProductModelAsync } from "../feature/product/Slice/productSlice";
import Loading from "../components/Loading";
function ProductModelRow({ el }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [showProductItems, setShowProductItems] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const deleteModel = (e) => {
    console.log("delete");
    e.preventDefault();
    dispatch(deleteProductModelAsync(el.id));
    setOpenDelete(false);
    window.location.reload();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) return <Loading></Loading>;
  return (
    <>
      {" "}
      <tr
        role="button"
        onClick={() => {
          setShowProductItems(!showProductItems);
        }}
        className="hover:bg-gray-50 p-2"
      >
        <td className="whitespace-nowrap px-4 py-5 font-light text-gray-600">
          {el.name}
        </td>
        {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
  {el.description}
</td> */}
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {el.discount} %
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {el.price}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {transformData.createCategory(el)}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {transformData.createGender(el)}
        </td>
        <td className="whitespace-nowrap px-4 py-2">
          <div className="flex gap-5">
            {/* <Link to={`/productModelDetail/${el.id}`}> */}
            <Link to={`/productModelDetail/${el.id}`}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  // setOpen(true);
                }}
                className="flex gap-2 justify-center items-center rounded-xl bg-gray-100 px-4 py-2 text-xs font-medium text-black hover:bg-gray-200 duration-300"
              >
                <i class="fa-regular fa-eye"></i>
              </div>
            </Link>

            <div
              onClick={() => {
                setOpenDelete(true);
              }}
              href="#"
              className="bg-gray-100  hover:bg-gray-200 flex gap-2 justify-center items-center rounded-xl px-4 py-2 text-xs font-medium text-gray-700  duration-300 "
            >
              <i class="fa-regular fa-trash-can text-gray-700"></i>
              <p>Delete</p>
            </div>
            <Modal
              open={openDelete}
              title="DELETE PRODUCT MODEL"
              width={30}
              onClose={(e) => {
                e.stopPropagation();
                setOpenDelete(false);
              }}
            >
              <div className="border  p-5 border-gray-200 rounded-xl">
                <div className="flex justify-between w-[200px]">
                  <p className="text-gray-500">Product Name:</p>
                  <p className="font-semibold text-l">{el.name}</p>
                </div>
                <div className="flex justify-between w-[200px]">
                  <p className="text-gray-500">Price:</p>
                  <p className="font-semibol text-l">{el.price}</p>
                </div>
                <div className="flex justify-between w-[200px]">
                  <p className="text-gray-500">Category:</p>
                  <p className="font-semibold text-l">
                    {transformData.createCategory(el)}
                  </p>
                </div>
                <div className="flex justify-between w-[200px]">
                  <p className="text-gray-500">Gender:</p>
                  <p className="font-semibold text-l">
                    {transformData.createGender(el)}
                  </p>
                </div>
                <div className="flex gap-5 mt-10 ">
                  <button
                    className="flex gap-2 items-center justify-center border border-gray-800 rounded-xl py-1 px-2 hover:bg-gray-800 hover:text-white duration-300"
                    onClick={deleteModel}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                    <p>Delete</p>
                  </button>
                  <button
                    className="text-gray-400 border hover:bg-gray-800 hover:text-white duration-300 border-gray-400 rounded-xl py-1 px-2"
                    onClick={() => {
                      setOpenDelete(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </td>
      </tr>
      <tr className="bg-red-400"></tr>
    </>
  );
}

export default ProductModelRow;
