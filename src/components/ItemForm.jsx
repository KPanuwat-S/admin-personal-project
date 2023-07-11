import React, { useState } from "react";
import { category } from "../data/category";
import Button from "./Button";

function ItemForm() {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    gender: "",
    category: "",
    size: "",
    quantity: "",
    img: "",
  });
  const dataHandler = (e) => {
    e.preventDefault();
    const newData = { ...itemData, [e.target.name]: e.target.value };
    setItemData(newData);
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

        <div className="flex gap-5 items-start">
          <div className="">
            <label htmlFor="gender">Gender</label>
            <div className="flex gap-5">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                value="1"
                id="male"
                name="gender"
                onChange={dataHandler}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                value="2"
                id="female"
                name="gender"
                onChange={dataHandler}
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={dataHandler}
              className="bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
              value={itemData.category}
            >
              {category.map((el) => {
                if (el.gender == itemData.gender) {
                  return <option value={el.id}>{el.category}</option>;
                }
              })}
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="flex-1">
            <label htmlFor="img">Product Size</label>
            <select
              name="size"
              id="size"
              onChange={dataHandler}
              className="bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={itemData.quantity}
              onChange={dataHandler}
              className="bg-gray-100 px-4 py-2 w-full rounded-xl focus:outline-none focus:bg-gray-200"
            />
          </div>
        </div>

        <div>
          {" "}
          <label htmlFor="img">Product Image</label>
          <div className="w-10 h-10 bg-gray-100" htmlFor="img">
            <input
              className="invisible"
              type="file"
              id="img"
              value={itemData.img}
            />
          </div>
          <div className="flex ">
            <div className="flex-1">
              
            </div>
            <div className="">
              <Button
                text="+ ADD ITEM"
                onClick={() => {
                  setOpen(false);
                }}
              ></Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
