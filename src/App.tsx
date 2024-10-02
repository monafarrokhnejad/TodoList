import { useEffect, useState } from "react";
import ModalComp from "./components/Modal";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "./utils/localStorageUtils";

export type DataType = {
  id: number;
  title: string;
  completed: boolean; // New property
};

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [value, setValue] = useState<string>("");
  const [lastItem, setLastItem] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<DataType | null>(null);

  useEffect(() => {
    const storedData = getLocalStorageItem<DataType[]>("data");
    setData(storedData || []);
  }, []);

  useEffect(() => {
    const ids = data?.map((item) => item.id);
    setLastItem(ids[ids.length - 1]);
  }, [data]);

  const handleClick = () => {
    if (value) {
      const newItem: DataType = {
        id: lastItem ? lastItem + 1 : 1,
        title: value,
        completed: false,
      };
      const updatedData = [...data, newItem];
      setData(updatedData);
      setLocalStorageItem("data", updatedData);
      setValue("");
    }
  };

  const handleDelete = (id: number) => {
    const filterData = data?.filter((item) => item.id !== id);
    setData(filterData);
    setLocalStorageItem("data", filterData);
  };

  const handleEdit = (id: number) => {
    const findItem = data?.find((item) => item.id === id);
    if (findItem) setEditItem(findItem);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditItem(null);
  };

  const handleSubmit = (value: string) => {
    if (value && editItem) {
      const updatedItems = data.map((item) =>
        item.id === editItem.id ? { ...item, title: value } : item
      );
      setData(updatedItems);
      setLocalStorageItem("data", updatedItems);
      handleClose();
    }
  };

  const handleCheckboxChange = (id: number) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setData(updatedItems);
    setLocalStorageItem("data", updatedItems);
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item?.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item?.title}
            <button type="submit" onClick={() => handleDelete(item?.id)}>
              Delete
            </button>
            <button type="submit" onClick={() => handleEdit(item?.id)}>
              edit
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>
        add
      </button>
      {isOpen && editItem && (
        <ModalComp
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          editItem={editItem}
        />
      )}
    </div>
  );
}

export default App;
