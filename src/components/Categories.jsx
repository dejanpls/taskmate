export default function Categories({
  handleChange,
  currentCategory,
  categories,
}) {
  return (
    <>
      <label htmlFor="category">
        Category:
        <select
          value={currentCategory}
          onChange={handleChange}
          id="category"
          name="category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category[0].toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
