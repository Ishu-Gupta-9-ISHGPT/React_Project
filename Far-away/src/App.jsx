import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, name: "Passport", quantity: 2, packed: true },
//   { id: 2, name: "Sunglasses", quantity: 12, packed: false },
//   { id: 3, name: "Sunscreen", quantity: 3, packed: false },
//   { id: 4, name: "Camera", quantity: 1, packed: true },
//   { id: 5, name: "Hiking Boots", quantity: 1, packed: false },
//   { id: 6, name: "Water Bottle", quantity: 2, packed: true },
//   { id: 7, name: "First Aid Kit", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteAll() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedItem={handleTogglePacked}
        onDeleteAll={handleDeleteAll}
      />
      <Stats items={items} />
    </div>
  );
}
