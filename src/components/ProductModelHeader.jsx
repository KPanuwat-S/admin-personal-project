import React, { useState } from "react";
import Modal from "./Modal";
import ProductModelForm from "./ProductModelForm";
function ProductModelHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10 flex">
      <div className="flex-1"></div>
      <div
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
          <ProductModelForm />
        </Modal>
      </div>
    </div>
  );
}

export default ProductModelHeader;
