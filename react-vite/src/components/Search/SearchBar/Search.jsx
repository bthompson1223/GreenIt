import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetSearchedPosts, clearSearch } from "../../../redux/search";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchedPost from "../SearchedPost/SearchedPost";
import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const searchedPostsObj = useSelector((state) => state.search);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      let timeoutId = setTimeout(() => {
        dispatch(thunkGetSearchedPosts(searchValue));
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        dispatch(clearSearch());
      };
    }
  }, [searchValue, dispatch]);

  const searchedPosts = Object.values(searchedPostsObj);

  return (
    <>
      <FaSearch className="search-icon" id="search-icon" />
      <input
        id="search-bar"
        type="text"
        placeholder="Search for a post!"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FaTimes id="clear-search" onClick={() => setSearchValue("")} />
      {searchValue && (
        <div className="search-results-div">
          {Object.values(searchedPostsObj).length ? (
            <ul className="search-results">
              {searchedPosts.map((post) => (
                <SearchedPost
                  post={post}
                  setSearchValue={setSearchValue}
                  key={post.id}
                />
              ))}
            </ul>
          ) : (
            <div className="search-results">
              <h1>No posts found!</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
