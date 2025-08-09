import React , {useState} from 'react'
import{FaSearch} from "react-icons/fa"
import "./SearchBar.css"

const SearchBar = ({ setResults }) => {
  const [input,setInput]=useState("");

  const fetchData = async (value)  => {
         await fetch("http://fakestoreapi.com/products").then((response) => response.json())
        .then(json => {
            const results = json.filter((item)=>{
                return  (value &&
                     item && 
                     item.title  &&
                      item.title.toLowerCase().includes(value)
                      );
            });
            setResults(results);
        });
        
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }
  return (
    <div className='input-wrapper'>
<FaSearch id="search-icon" />
<input placeholder='Type to search...' value={input} onChange={(e)=> handleChange(e.target.value)}
/>

    </div>

  );
};

export default SearchBar