import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ filter }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchText(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    filter(searchText);
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline my-5">
      <input className="form-control form-control-lg flex-grow-1" type="text" placeholder="Enter search term..." value={searchText} onChange={handleChange} />
      <button className="btn btn-lg btn-primary">Submit</button>
    </form>
  );
}

export default SearchForm;