export default function Tabs({ handleFilter }) {
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
    </div>
  );
}
