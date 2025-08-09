import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResult.css';

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/store/${result.id}`);
  };

  return (
    <div className='search-result' onClick={handleClick}>
      {result.title}
    </div>
  );
};

export default SearchResult;
