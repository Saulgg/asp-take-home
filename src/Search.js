import { useState } from "react";

export default function Search(props) {
  const { setSearchTerm } = props;
  const [search, setSearch] = useState("");

  /**
   * Handles form submit
   * @param {HTMLEvent} event Triggered event
   */
  function onFormSubmit(event) {
    event.preventDefault();
    setSearchTerm(search);
    setSearch("");
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        value={search}
        name="search"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        data-testid="search-input"
      />
      <button type="submit" data-testid="search-button">Search</button>
    </form>
  );
}
