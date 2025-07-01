import { useState } from "react";

export default function Form({ onAdditems }) {
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

    onAdditems(newItem);
    console.table("New item added:", newItem);
    // Here you would typically add the new item to your state or context

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
