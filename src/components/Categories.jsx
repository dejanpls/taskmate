export default function Categories({ categories }) {
  return (
    <>
      <label htmlFor="category">
        Category:
        <select id="category" name="category">
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
