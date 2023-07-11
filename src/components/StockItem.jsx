import React from "react";

function StockItem() {
  return (
    <div className="border-b pb-5">
      {" "}
      <div className="flex px-10">
        <div className="flex flex-1 gap-5">
          <div className="w-[140px] ">
            <img src="https://static.zara.net/photos///2023/V/0/1/p/1887/411/800/2/w/1126/1887411800_1_1_1.jpg?ts=1675764461618" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-light">Name</p>
            <p className="font-light">T-Shirts</p>
            <p className="font-light">Description</p>
            <div>
              <p className="font-light">COLOR</p>
              <div className="w-4 h-4 bg-black"></div>
            </div>
            <p className="font-light">Size</p>
            <button className="mt-3 flex text-gray-500 items-center gap-2 hover:text-gray-800">
              <i class="fa-regular fa-pen-to-square "></i>
              <p className="font-light">Edit</p>
            </button>
          </div>
        </div>
        <div className="flex-1">500</div>
        <div className="flex flex-col gap-5 items-center">
          <p>500</p>
          <button>
            <i class="fa-regular fa-trash-can text-gray-500 hover:text-gray-800"></i>
          </button>
        </div>
      </div>
      {/* <hr className="" /> */}
    </div>
  );
}

export default StockItem;
