import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface Item {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const storedItems = localStorage.getItem("items");
  const [text, setText] = useState("");
  const [items, setItems] = useState<Item[]>(
    storedItems ? JSON.parse(storedItems) : []
  );

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

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className="bg-black p-4 rounded-lg w-64">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded placeholder:italic"
          placeholder="Type something"
        />
        <button type="submit" className="mt-4 w-full p-2 bg-white rounded-lg">
          Add item
        </button>
      </form>
      <div className="mt-6 flex items-center justify-between">
        <ul className="bg-gray-400 w-64 p-4 rounded-lg">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-2 flex items-center justify-between border-b"
            >
              {item.text}
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 p-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
