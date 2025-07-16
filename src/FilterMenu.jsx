function FilterMenu({ typeFilter, setTypeFilter }) {
  return (
    <div className="filter-menu">
      <label>
        Type:
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
        </select>
      </label>
    </div>
  );
}

export default FilterMenu;