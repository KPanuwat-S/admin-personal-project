import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductModelHeader from "../components/ProductModelHeader";
import { Collapse } from "react-collapse";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductItemAsync,
  getOneProductModelAsync,
  getProductModelItemsAsync,
  setEditMode,
  setIsNotEditMode,
} from "../feature/product/Slice/productSlice";
import * as transformData from "../utils/transform";
import cn from "../utils/cn";
import UploadImage from "../components/UploadImage";
import ProductItemDetail from "./ProductItemDetail";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ProductModelEdit from "../components/ProductModelEdit";
function ProductModelDetail() {
  const { id } = useParams();
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const [url, setUrl] = useState([]);
  const [openSize, setOpenSize] = useState(true);
  const addHandle = () => {
    dispatch(setEditMode());
    setAdd(false);
  };
  const [quantity, setQuantity] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const editMode = useSelector((state) => state.product.isEdit);
  console.log("editMode", editMode);
  useEffect(() => {
    console.log("running");
    dispatch(getOneProductModelAsync(id));
    dispatch(getProductModelItemsAsync(id));
  }, []);
  const colorMap = [
    { id: 1, color: "black" },
    { id: 2, color: "white" },
    { id: 3, color: "gray" },
    { id: 4, color: "blue" },
    { id: 5, color: "brown" },
    { id: 6, color: "red" },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [selectLabel, setSelectLabel] = useState("");
  const [openSelectColor, setOpenSelectColor] = useState(false);
  const productModel = useSelector((state) => state.product.productModel);
  const productModelItems = useSelector(
    (state) => state.product.productModelItems
  );
  console.log("productModelItems", productModelItems);
  const quantityHandler = (e) => {
    setQuantity((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Submit
  const onSubmit = () => {
    const finalData = {
      id: id,
      data: {
        imgs: url.map((el) => {
          return { imgAddress: el };
        }),
        colorId: selectLabel.id,
        quantity: quantity,
      },
    };
    console.log("final edit", finalData);
    if (selectLabel.id == undefined) alert("Please Complete Form");
    else {
      dispatch(createProductItemAsync(finalData));
      window.location.reload();
      setAdd(false);
    }
  };

  
  if (isLoading) return <Loading></Loading>;
  return (
    <div className="bg-[#F2F3F5] w-full h-screen">
      <div className="p-5"></div>
      <div className="rounded-xl  bg-white max-h-[780px] w-[1080px] mx-[120px] p-5 mt-[10px] overflow-y-auto">
        <div className="flex gap-2 ">
          <div className="flex-1 bg-gray-50 shadow-sm rounded-xl p-5 border border-gray-100 mb-10">
            <div className="flex gap-5">
              <p className="font-semibold">Product Model</p>{" "}
              <p>{productModel?.name}</p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold">Description</p>{" "}
              <p>{productModel?.description}</p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold">Category</p>
              <p>
                {productModel?.Category?.category[0].toUpperCase() +
                  productModel?.Category?.category.slice(1)}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold">Gender</p>{" "}
              <p>{transformData.createGender(productModel)}</p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold">Price</p>{" "}
              <p>{productModel?.price}</p>
            </div>
            <div className="flex gap-5">
              <p className="font-semibold">Discount</p>{" "}
              <p>{productModel?.discount} %</p>
            </div>
          </div>

          {/* Add */}
          <div className="flex-1">
            <button
              onClick={() => {
                setAdd(true);
                dispatch(setIsNotEditMode());
              }}
              className="hover:bg-gray-100 text-gray-500 flex gap-2 rounded-xl border border-gray-100 items-center justify-center p-2"
            >
              <i class="fa-solid fa-plus"></i>
              <p>Add</p>
            </button>
            <button
              onClick={() => {
                setIsEdit(true);
              }}
              className="mt-5 hover:bg-gray-100 text-gray-500 flex gap-2 rounded-xl border border-gray-100 items-center justify-center p-2"
            >
              <i class="fa-regular fa-pen-to-square"></i>
              <p>Edit</p>
            </button>
            <Modal
              open={isEdit}
              title="ADD PRODUCT MODEL"
              width={30}
              onClose={() => {
                setIsEdit(false);
              }}
            >
              <ProductModelEdit setOpen={setIsEdit} id={id} />
            </Modal>
          </div>
        </div>

        {/* ------------------Product Item------------------ */}
        <Collapse
          isOpened={add}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="border rounded-xl flex p-2">
            <div className="flex">
              <div className="w-[450px]">
                <h2 className="ml-5 mt-2 text-left text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Add Product Item
                </h2>
                {!editMode && <UploadImage url={url} setUrl={setUrl} />}
                <div className="ml-8 flex gap-5 mt-10 mb-10">
                  <div
                    role="button"
                    className=" flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-white text-gray-600 border border-gray-600 p-1 px-3 rounded-xl duration-300"
                    onClick={onSubmit}
                  >
                    <i class="fa-regular fa-floppy-disk"></i>
                    <p>Save</p>
                  </div>
                  <div
                    role="button"
                    className="flex items-center justify-center gap-2 hover:bg-gray-800 hover:text-white text-gray-500 border p-1 px-3 rounded-xl duration-300"
                    onClick={addHandle}
                  >
                    Cancel
                  </div>
                </div>
              </div>

              {/* COLOR */}

              <div className="ml-10 mt-20 w-[120px]">
                <button
                  onClick={() => {
                    setOpenSelectColor(!openSelectColor);
                  }}
                  className="flex hover:bg-gray-100 rounded-xl items-center justify-center gap-2 p-2 border border-gray-100"
                >
                  <p className="text-gray-600">Color</p>
                  <div
                    className={cn(
                      selectLabel.id == 1
                        ? "bg-black"
                        : selectLabel.id == 2
                        ? "bg-white border"
                        : selectLabel.id == 3
                        ? "bg-gray-500"
                        : selectLabel.id == 4
                        ? "bg-blue-500"
                        : selectLabel.id == 5
                        ? "bg-amber-600"
                        : "bg-red-500",
                      "h-2 w-6 rounded-[4px]"
                    )}
                  ></div>
                </button>
                <Collapse isOpened={openSelectColor}>
                  <div className="flex flex-col">
                    {colorMap.map((el) => {
                      return (
                        <button
                          onClick={() => {
                            setSelectLabel(el);
                            setOpenSelectColor(false);
                          }}
                          key={el.id}
                          className={cn(
                            el.id == selectLabel.id ? "bg-gray-100" : "",
                            "flex gap-2 justify-between items-center hover:bg-gray-100 rounded-[4px] p-2"
                          )}
                        >
                          <div
                            key={el.key}
                            className="text-gray-600 font-light "
                          >
                            {el.color}
                          </div>
                          <div
                            key={el.id}
                            className={cn(
                              el.id == 1
                                ? "bg-black"
                                : el.id == 2
                                ? "bg-white border"
                                : el.id == 3
                                ? "bg-gray-500"
                                : el.id == 4
                                ? "bg-blue-500"
                                : el.id == 5
                                ? "bg-amber-600"
                                : "bg-red-500",
                              "h-3 w-10 rounded-[4px]"
                            )}
                          ></div>
                        </button>
                      );
                    })}
                  </div>
                </Collapse>
              </div>
              <div className="ml-10 mt-20 w-[120px]">
                <div
                  onClick={() => {
                    setOpenSize(!openSize);
                  }}
                  className="text-center p-2 rounded-xl border text-gray-500"
                >
                  SIZE
                </div>
                <Collapse isOpened={openSize}>
                  <div className="ml-5 text-gray-700 flex flex-col gap-2 mt-5">
                    <div className="w-[240px] flex gap-5 justify-between items-center">
                      <label htmlFor="1">S</label>
                      <input
                        className="border  px-2 p-1 rounded-xl text-center "
                        type="number"
                        name="1"
                        id="1"
                        value={quantity[1]}
                        placeholder="stock quantity"
                        onChange={quantityHandler}
                      />
                    </div>
                    <div className="w-[240px] flex gap-5 items-center justify-between">
                      <label htmlFor="2">M</label>
                      <input
                        className="border px-2 p-1 rounded-xl text-center"
                        type="number"
                        name="2"
                        id="2"
                        value={quantity[2]}
                        placeholder="stock quantity"
                        onChange={quantityHandler}
                      />
                    </div>
                    <div className="w-[240px] flex gap-5  items-center justify-between">
                      <label htmlFor="4">L</label>
                      <input
                        className="border px-2 p-1 rounded-xl text-center"
                        type="number"
                        name="3"
                        id="3"
                        value={quantity[3]}
                        placeholder="stock quantity"
                        onChange={quantityHandler}
                      />
                    </div>
                    <div className="w-[240px] flex gap-5 items-center justify-between">
                      <label htmlFor="4">XL</label>
                      <input
                        className="border px-2 p-1 rounded-xl text-center"
                        type="number"
                        name="4"
                        id="4"
                        value={quantity[4]}
                        placeholder="stock quantity"
                        onChange={quantityHandler}
                      />
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Collapse>
        <div className="flex flex-col gap-2 mt-5">
          {productModelItems.map((el) => (
            <ProductItemDetail data={el} modelId={id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductModelDetail;
