import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import ItemForm from "./ItemForm";

function StockHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10 flex">
      <div className="flex-1"></div>
      <Button
        text="+ ADD ITEM"
        onClick={() => {
          setOpen(true);
        }}
      ></Button>
      <div>
        <Modal
          open={open}
          title="ADD ITEM"
          width={30}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ItemForm></ItemForm>
        </Modal>
      </div>
    </div>
  );
}

export default StockHeader;
