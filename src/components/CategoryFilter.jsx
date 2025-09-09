export default function CategoryFilter({
  handleCategoriesChange,
  selectedCategories,
  categories,
}) {
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={`show-${category}`}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoriesChange(category)}
            />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
