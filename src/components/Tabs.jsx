import '../styles/tabs.css';

export default function Tabs({ setShowDeleted, handleFilter }) {
  return (
    <div className="filterControls">
      <div className="tabsContainer">
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
      <button
        className="material-icons"
        onClick={() => setShowDeleted((prev) => !prev)}
        value="deleted"
        type="button"
      >
        delete
      </button>
    </div>
  );
}
