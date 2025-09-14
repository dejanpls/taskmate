import CategoryInput from './CategoryInput.jsx';

export default function Categories({
  handleChange,
  showCategoryInput,
  setShowCategoryInput,
  currentCategory,
  categories,
  categoryInputData,
}) {
  return (
    <div className="category">
      <label htmlFor="category">
        Category:
        <select
          disabled={showCategoryInput}
          value={currentCategory}
          onChange={handleChange}
          id="category"
          name="category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {(category[0].toUpperCase() + category.slice(1)).length > 15
                ? category[0].toUpperCase() +
                  category.slice(1).substring(0, 12) +
                  '...'
                : category[0].toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => setShowCategoryInput((prev) => !prev)}
      >
        {showCategoryInput ? 'X' : '+ Category'}
      </button>
      {showCategoryInput && <CategoryInput {...categoryInputData} />}
    </div>
  );
}
