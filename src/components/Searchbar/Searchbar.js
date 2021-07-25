import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onFormSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = event => {
    setQuery(event.target.value);
  };
  const handleFormSubmit = event => {
    event.preventDefault();

    onFormSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={query}
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
