export default function SortDropdown({ sort, handleSort }) {
  return (
    <>
      <label htmlFor="sort">
        <select name="sort" id="sort" value={sort} onChange={handleSort}>
          <option value="newestFirst">Newest First</option>
          <option value="oldestFirst">Oldest First</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
          <option value="priorityLowHigh">Priority Low-High</option>
          <option value="priorityHighLow">Priority High-Low</option>
          <option value="dueDateAsc">Due Date Ascending</option>
          <option value="dueDateDesc">Due Date Descending</option>
        </select>
      </label>
    </>
  );
}
