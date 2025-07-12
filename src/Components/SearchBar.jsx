import { useCart } from "../contexts/useCart";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useCart();

  return (
    <div style={{ padding: "20px 0", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input"
        style={{ width: "300px", maxWidth: "100%" }}
      />
    </div>
  );
}

export default SearchBar;
