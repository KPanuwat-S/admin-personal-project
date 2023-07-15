import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductModelAsync,
  editProductModelAsync,
  getOneProductModelAsync,
  getProductCategoryAsync,
} from "../feature/product/Slice/productSlice";
import cn from "../utils/cn";

function ProductModelEdit({ setOpen, id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategoryAsync());
    dispatch(getOneProductModelAsync(id));
  }, []);
  const productModel = useSelector((state) => state.product.productModel);

  const [itemData, setItemData] = useState({
    name: productModel?.name,
    description: productModel?.description,
    discount: productModel?.discount,
    price: productModel?.price,
    genderId: productModel?.genderId,
    categoryId: productModel?.Category.id,
  });

  const categories = useSelector((state) => state.product.categories);
  const genders = [
    { id: 1, description: "male" },
    { id: 2, description: "female" },
  ];
  const [selectedGender, setSeletectdGender] = useState(0);
  const dataHandler = (e) => {
    e.preventDefault();
    const newData = { ...itemData, [e.target.name]: e.target.value };
    console.log("newData", newData);
    setItemData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("item data on submit", itemData);
    const input = {
      id: id,
      data: itemData,
    };
    dispatch(editProductModelAsync(input));
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <form action="" className="flex flex-col gap-5">
        <div>
          {" "}
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
            value={itemData.name}
            onChange={dataHandler}
          />
        </div>
        <div>
          <label htmlFor="description">Product Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
            value={itemData.description}
            onChange={dataHandler}
          />
        </div>
        <div className="flex gap-5">
          <div>
            <label htmlFor="price">Price</label>
            <input
              className="bg-gray-100 px-4 py-2 rounded-xl"
              id="price"
              name="price"
              type="number"
              value={itemData.price}
              onChange={(e) => {
                e.preventDefault();
                setItemData((prev) => {
                  return { ...prev, price: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="discount">Discount</label>
            <input
              className="bg-gray-100 px-4 py-2 rounded-xl"
              id="discount"
              name="discount"
              type="number"
              value={itemData.discount}
              onChange={(e) => {
                e.preventDefault();
                setItemData((prev) => {
                  return { ...prev, discount: e.target.value };
                });
              }}
            />
          </div>
        </div>
        <div className="flex gap-5 items-start">
          <div className="">
            <label htmlFor="gender">Gender</label>
            <div className="flex gap-5 mt-2">
              {genders.map((el) => {
                return (
                  <div
                    role="button"
                    onClick={() => {
                      setSeletectdGender(el.id);
                      setItemData((prev) => {
                        return { ...prev, genderId: el.id };
                      });
                    }}
                    className={cn(
                      itemData.genderId == el.id
                        ? "bg-gray-800 text-white hover:bg-gray-800"
                        : "",
                      "px-2 py-1 border rounded-xl hover:bg-gray-100"
                    )}
                  >
                    {el.description}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="category">Category</label>
            <select
              name="categoryId"
              id="category"
              onChange={dataHandler}
              className="mt-2 bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
              value={itemData.categoryId}
            >
              <option>------SELECT CATEGORY------</option>
              {categories.map((el) => {
                if (el.genderId == itemData.genderId) {
                  return (
                    <option key={el.id} value={el.id}>
                      {el.category}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>

        <div className="flex gap-5 mt-10 mb-10">
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
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductModelEdit;

// UI
