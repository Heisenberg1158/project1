import React, { useState } from 'react';
import './styles/SearchBarStyle.css';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const SearchBar = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a858c8326da3f328024afc1c5dca9e9&query=${value}`);
        const data = await response.json();

        // Defensive check for API response
        const movieSuggestions = data.results?.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        })) || [];
        setSuggestions(movieSuggestions);
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        setSuggestions([]);
      }
    }
  };

  const handleSearch = () => {
    setQuery(''); // Clear input after search
    setSuggestions([]); // Clear suggestions after search
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
        <div className="suggestions">
          {suggestions.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchBar;
