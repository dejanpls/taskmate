export default function CategoryInput({
  newCategory,
  handleCategoryInputChange,
  handleAddCategory,
  alreadyExists,
}) {
  return (
    <>
      <label htmlFor="newCategory">
        <input
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
        Add
      </button>
    </>
  );
}
