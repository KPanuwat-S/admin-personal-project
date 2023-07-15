import React, { useEffect, useState } from "react";
import createColor from "../utils/createColor";
import * as transformData from "../utils/transform";
import { useDispatch } from "react-redux";
import {
  createProductItemAsync,
  deleteProductItemAsync,
  setEditMode,
  setIsNotEditMode,
} from "../feature/product/Slice/productSlice";
import { Collapse } from "react-collapse";
import cn from "../utils/cn";
import { data } from "autoprefixer";
import EditImage from "../components/EditImage";

function ProductItemDetail({ data, modelId }) {
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const [url, setUrl] = useState(data.imgs);
  const [openSize, setOpenSize] = useState(true);
  console.log("data", data);
  const addHandle = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(setEditMode());
  }, []);

  let transformQuantity = {};
  data.stockQuantity.forEach((el) => {
    transformQuantity[el.id] = el.quantity;
  });

  const [quantity, setQuantity] = useState(transformQuantity);

  console.log("data", data);
  const colorMap = [
    { id: 1, color: "black" },
    { id: 2, color: "white" },
    { id: 3, color: "gray" },
    { id: 4, color: "blue" },
    { id: 5, color: "brown" },
    { id: 6, color: "red" },
  ];

  const [selectLabel, setSelectLabel] = useState(
    colorMap.find((el) => el.id == data.colorId)
  );
  const [openSelectColor, setOpenSelectColor] = useState(false);
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
    const toBeDeleted = {
      id: +modelId,
      colorId: data.colorId,
    };
    const finalData = {
      id: modelId,
      data: {
        imgs: url.map((el) => {
          return { imgAddress: el };
        }),
        colorId: selectLabel.id,
        productItemId: data.productItemId,
        quantity: quantity,
      },
    };
    console.log("finalData", finalData);
    if (selectLabel.id == undefined) alert("Hey");

    dispatch(deleteProductItemAsync(toBeDeleted));
    dispatch(createProductItemAsync(finalData));
    dispatch(setIsNotEditMode());
    window.location.reload();
    setIsEdit(false);
  };

  console.log("test");
  const color = createColor(data.colorId);
  console.log("color", color);
  const style = {
    backgroundColor: color,
  };

  const deleteItem = (e) => {
    e.preventDefault();
    const input = {
      id: +modelId,
      colorId: data.colorId,
    };
    console.log("input", input);
    dispatch(deleteProductItemAsync(input));
    window.location.reload();
  };

  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <div
        className={cn(
          isEdit ? "animate-pulse bg-gray-200" : "",
          "flex border items-center rounded-xl p-5 gap-10"
        )}
      >
        {/* Color */}
        <div className="flex gap-5">
          <p className="text-gray-700">Color</p>
          <div
            className="w-5 h-5 rounded-full border shadow-sm"
            style={style}
          ></div>
        </div>

        {/* Size - quantity */}
        <div className="flex gap-5 text-xs flex-1">
          {data.stockQuantity.map((el) => {
            return (
              <div className="flex items-center justify-center gap-2 ">
                <i class="fa-solid fa-shirt text-gray-300"></i>
                <p className="text-gray-400">{transformData.createSize(el)}:</p>
                <p>{el.quantity}</p>
              </div>
            );
          })}
        </div>
        {/* Icon */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsEdit(true);
            }}
            className="flex items-center justify-center border py-2 px-3 rounded-xl group hover:bg-gray-100"
          >
            <i class="fa-regular fa-pen-to-square text-gray-400 group-hover:text-gray-600"></i>
          </button>
          <button
            onClick={deleteItem}
            className="flex items-center justify-center border py-2 px-3 rounded-xl group hover:bg-gray-100"
          >
            <i class="fa-regular fa-trash-can text-gray-400 group-hover:text-gray-600"></i>
          </button>
        </div>

        {/* Edit Mode */}
      </div>
      <Collapse
        isOpened={isEdit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border rounded-xl flex p-2">
          <div className="flex">
            <div className="w-[450px]">
              <h2 className="ml-5 mt-2 text-left text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Edit Product Item
              </h2>
              {/* <UploadEditImage url={url} setUrl={setUrl} /> */}
              <EditImage url={url} setUrl={setUrl} />
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
                        <div key={el.key} className="text-gray-600 font-light ">
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
    </>
  );
}

export default ProductItemDetail;
