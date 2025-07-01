export default function Item({ item, onDeleteItem, onPackedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item?.packed}
        onChange={() => onPackedItem(item?.id)}
      />
      <span style={{ textDecoration: item?.packed ? "line-through" : "none" }}>
        {item?.quantity} {item?.name}
      </span>
      <button onClick={() => onDeleteItem(item?.id)}>❌</button>
    </li>
  );
}
