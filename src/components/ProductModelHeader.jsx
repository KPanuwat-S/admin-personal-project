import React, { useState } from "react";
import Modal from "./Modal";
import ProductModelForm from "./ProductModelForm";
function ProductModelHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10 flex">
      <div className=" flex-1 ml-[80px]">
        {/* <div className="bg-white w-[450px] rounded-xl h-[50px]">
          <div className="w-[120px] border rounded-xl">Gender</div>
        </div> */}
      </div>

      <div
        role="button"
        className="hover:bg-gray-200 p-2 px-3 rounded-xl border-gray-700 border"
        onClick={() => {
          setOpen(true);
        }}
      >
        + Add Item
      </div>
      <div>
        <Modal
          open={open}
          title="ADD PRODUCT MODEL"
          width={30}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ProductModelForm setOpen={setOpen} />
        </Modal>
      </div>
    </div>
  );
}

export default ProductModelHeader;
