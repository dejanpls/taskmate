export default function Tabs({ setShowFilter, setShowDeleted, handleFilter }) {
  return (
    <div>
      <button onClick={handleFilter} value="all" type="button">
        All
      </button>
      <button onClick={handleFilter} value="active" type="button">
        Active
      </button>
      <button onClick={handleFilter} value="done" type="button">
        Done
      </button>
      <button
        onClick={() => setShowDeleted((prev) => !prev)}
        value="deleted"
        type="button"
      >
        Deleted
      </button>
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        value="filter"
        type="button"
      >
        Filter By Category
      </button>
    </div>
  );
}
