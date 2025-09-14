import '../styles/tabs.css';

export default function Tabs({ setShowDeleted, filter, handleFilter }) {
  return (
    <div className="filterControls">
      <div className="tabsContainer">
        <button
          className={filter === 'all' ? 'all' : 'default'}
          onClick={handleFilter}
          value="all"
          type="button"
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : 'default'}
          onClick={handleFilter}
          value="active"
          type="button"
        >
          Active
        </button>
        <button
          className={filter === 'done' ? 'done' : 'default'}
          onClick={handleFilter}
          value="done"
          type="button"
        >
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
