import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

interface Item {
  id: string;
  text: string;
}

const Form = () => {
  const storedItems = localStorage.getItem("items");
  const [text, setText] = useState("");
  const [items, setItems] = useState<Item[]>(
    storedItems ? JSON.parse(storedItems) : []
  );
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setItems([...items, { id: Date.now().toString(), text }]);
    setText("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    setEditing(id);
    setText(items.find((item) => item.id === id)?.text || "");
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    setItems(
      items.map((item) => (item.id === editing ? { ...item, text } : item))
    );
    setEditing(null);
    setText("");
  };

  return (
    <div className="mt-4 flex items-center flex-col">
      {!editing ? (
        <form onSubmit={handleSubmit} className="bg-black p-4 rounded-lg w-64">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded placeholder:italic bg-gray-500 placeholder-black"
            placeholder="Type something"
          />
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-1 w-full p-2 bg-gray-200 hover:bg-white rounded-lg"
          >
            <FaPlus /> <span>Add item</span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="bg-zinc-900 p-4 rounded-lg w-64"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded placeholder:italic placeholder-black bg-gray-500"
            placeholder="Edit item"
          />
          <button
            onClick={() => handleUpdate}
            type="submit"
            className="mt-2 w-full p-2 bg-gray-200 hover:bg-white rounded-lg"
          >
            Update item
          </button>
        </form>
      )}
      <div className="mt-6 flex items-center justify-between">
        <ul className="bg-gray-200 w-64 p-4 rounded-lg">
          {items.length === 0 ? (
            <li className="p-2 flex items-center justify-between border-b border-black">
              Start by adding a new task!
            </li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className="p-2 flex items-center justify-between border-b border-black"
              >
                {item.text}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-gray-500 hover:bg-gray-600 p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-400 hover:bg-red-500 p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Form;
