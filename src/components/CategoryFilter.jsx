export default function CategoryFilter({
  handleCategoriesChange,
  selectedCategories,
  categories,
  categoryInUse,
  handleDeleteCategory,
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
            <button
              disabled={categoryInUse(category)}
              onClick={() => handleDeleteCategory(category)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
