export default function CategoryInput({
  newCategory,
  handleCategoryInputChange,
  handleAddCategory,
  alreadyExists,
}) {
  return (
    <div className="categoryInput">
      <label htmlFor="newCategory">
        <input
          placeholder="e.g. Work"
          value={newCategory}
          onChange={handleCategoryInputChange}
          name="newCategory"
          id="newCategory"
        />
      </label>
      <button
        disabled={!newCategory || alreadyExists}
        type="button"
        onClick={handleAddCategory}
      >
        +
      </button>
    </div>
  );
}
