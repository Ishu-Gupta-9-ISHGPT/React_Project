import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onPackedItem,
  onDeleteAll,
}) {
  const [sortBy, setSortBy] = useState("default");
  let sortedItems = [...items];

  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  } else if (sortBy === "quantity") {
    sortedItems.sort((a, b) => a.quantity - b.quantity);
  }

  return (
    <div className="list">
      <ul style={{ overflow: "hidden" }}>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item?.id}
            onDeleteItem={onDeleteItem}
            onPackedItem={onPackedItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Sort by Input Order</option>
          <option value="name">Sort by Name</option>
          <option value="packed">Sort by Packed Status</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete all items?"
            );
            if (confirmed) {
              onDeleteAll();
            }
          }}
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
