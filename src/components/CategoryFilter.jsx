import '../styles/categoryFilter.css';

export default function CategoryFilter({
  handleCategoriesChange,
  selectedCategories,
  categories,
  categoryInUse,
  handleDeleteCategory,
}) {
  return (
    <div className="categoryFilterContainer">
      <ul>
        <h2>Selected Categories</h2>
        {categories.map((category) => (
          <li key={`show-${category}`}>
            <div className="primaryContainer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoriesChange(category)}
              />
              <span>{category}</span>
            </div>
            <div className="buttonContainer">
              <button
                className="material-icons"
                disabled={categoryInUse(category)}
                onClick={() => handleDeleteCategory(category)}
                type="button"
              >
                delete_forever
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
