import React, { useState } from 'react';
import './styles/SearchBarStyle.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, movies, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter movies based on user input
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = movies.filter(movie =>
        movie.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSearch = () => {
    onSearch(query);
    setQuery(''); // Clear input after search
    setSuggestions([]); // Clear suggestions after search
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (movie) => {
    setQuery(movie);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      />
      <button onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie, index) => (
            <li key={index} onClick={() => handleSuggestionClick(movie)}>
              {movie}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
