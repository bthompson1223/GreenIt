const GET_SEARCHED_POSTS = "search/GET_SEARCHED_POSTS";
const CLEAR_SEARCH = "search/CLEAR_SEARCH";

const getSearchedPosts = (posts) => ({
  type: GET_SEARCHED_POSTS,
  posts,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const thunkGetSearchedPosts = (searchValue) => async (dispatch) => {
  const res = await fetch(`/api/posts?search=${searchValue}`);
  if (res.ok) {
    const posts = await res.json();
    dispatch(getSearchedPosts(posts));
    return posts;
  } else {
    const errs = await res.json();
    return errs;
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCHED_POSTS: {
      const newState = {};
      action.posts.forEach((post) => (newState[post.id] = post));
      return newState;
    }
    case CLEAR_SEARCH: {
      return {};
    }
    default:
      return state;
  }
};

export default searchReducer;
