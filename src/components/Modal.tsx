import { useState } from "react";
import { DataType } from "../App";

type ModalProps = {
  handleClose: () => void;
  handleSubmit: (item: string) => void;
  editItem: DataType;
};

const ModalComp = ({ handleClose, handleSubmit, editItem }: ModalProps) => {
  const [value, setValue] = useState<string>(editItem.title);

  return (
    <div
      style={{
        background: "pink",
        width: "500px",
        height: "max-content",
        padding: "10px",
        position: "absolute",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Edit</h3>
        <button type="submit" onClick={handleClose}>
          close
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" onClick={() => handleSubmit(value)}>
        ok
      </button>
    </div>
  );
};

export default ModalComp;
