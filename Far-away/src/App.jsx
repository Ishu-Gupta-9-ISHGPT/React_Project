import { useState } from "react";

const initialItems = [
  { id: 1, name: "Passport", quantity: 2, packed: true },
  { id: 2, name: "Sunglasses", quantity: 12, packed: false },
  { id: 3, name: "Sunscreen", quantity: 3, packed: false },
  { id: 4, name: "Camera", quantity: 1, packed: true },
  { id: 5, name: "Hiking Boots", quantity: 1, packed: false },
  { id: 6, name: "Water Bottle", quantity: 2, packed: true },
  { id: 7, name: "First Aid Kit", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    // Prevent form submission if name is empty
    if (!name) {
      return;
    }
    // Create a new item object
    // Using Date.now() as a simple unique ID generator
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      packed: false,
    };
    console.log("New item added:", newItem);
    // Here you would typically add the new item to your state or context
    initialItems.push(newItem);

    setName("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="quantity"
        id="item"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button> Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {initialItems.map((item) => (
          <Item item={item} key={item?.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={{ textDecoration: item?.packed ? "line-through" : "none" }}>
        {item?.quantity} {item?.name}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
