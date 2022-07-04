import React from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const searchFilter = useSelector(
      (state) => state.homepageReducers.searchFilter
  );

  const handleChange = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SEARCH_FILTER',
      payload: event.target.value,
    });
  }

  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={handleChange}
          // required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        {/* <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
          onSubmit={handleSubmit}
        >
          <IconSearch />
        </button> */}
      </div>
    </form>
  );
};
export default Search;
