import { useState } from 'react';
import './styles/SearchBar.css';
import { validateUserSearch } from '../utils/validateUserSearch';
import { useLocalStorage } from '../hooks/useLocalStorageHook';

const SearchBar = ({ placeholder = 'Search...', onSubmit }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const trimmed = value.trim();

    if (validateUserSearch(trimmed, setError)) {
      onSubmit(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar__wrapper">
      <input
        className="searchbar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />

      <button className="searchbar__submit_btn" type="submit">
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
          </g>
        </svg>
      </button>

      {error && <p className="searchbar__error">{error}</p>}
    </form>
  );
};

export default SearchBar;
