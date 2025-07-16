function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for anime..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;
