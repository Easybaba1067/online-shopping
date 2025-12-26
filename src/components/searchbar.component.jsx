import { useState, useRef } from "react";
import "../css-files/nav.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const previousPathRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      previousPathRef.current =
        window.location.pathname + window.location.search;
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    } else {
      navigate(previousPathRef.current || "/");
    }
  };
  return (
    <div className="search-input">
      <form onSubmit={handleSubmit} className="search-input">
        <input
          type="search"
          value={searchInput}
          placeholder="Search items..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
