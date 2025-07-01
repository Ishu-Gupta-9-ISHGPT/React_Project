export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding items to your packing list 🧳</em>
      </footer>
    );
  }

  const totalItems = items.length; // Replace with actual logic to calculate total items
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "🎉 You got everything packed!"
          : `💼 You have ${totalItems} items on your list, and you already packed ${packedItems} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}
