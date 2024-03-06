const LOAD_ALL_POSTS = "posts/LOAD_ALL_POSTS";
const LOAD_SINGLE_POST = "posts/LOAD_SINGLE_POST";
const LOAD_CURRENT_USER_POSTS = "posts/LOAD_CURRENT_USER_POSTS";
const CREATE_POST = "posts/CREATE_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const DELETE_POST = "posts/DELETE_POST";
const RETURN_INITIAL = "posts/RETURN_INITIAL";

const createPost = (post) => ({
  type: CREATE_POST,
  post: post,
});

const updatePost = (post) => ({
  type: UPDATE_POST,
  post: post,
});

const loadAllPosts = (posts) => ({
  type: LOAD_ALL_POSTS,
  posts,
});

const loadCurrentUserPosts = (posts) => ({
  type: LOAD_CURRENT_USER_POSTS,
  posts,
});

const loadSinglePost = (post) => ({
  type: LOAD_SINGLE_POST,
  post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const returnInitialPosts = () => ({
  type: RETURN_INITIAL,
});

export const thunkGetAllPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/");
  if (res.ok) {
    const allPosts = await res.json();
    dispatch(loadAllPosts(allPosts));
    return allPosts;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkUpdatePost = (postId, updatedPost) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    body: updatedPost,
  });

  if (res.ok) {
    const updatedPostData = await res.json();
    dispatch(updatePost(updatedPostData));
    return updatedPostData;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkGetSinglePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);
  if (res.ok) {
    const post = await res.json();
    dispatch(loadSinglePost(post));
    return post;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkCreatePost = (formData) => async (dispatch) => {
  const res = await fetch("/api/posts/new", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const newPost = await res.json();
    dispatch(createPost(newPost));
    return newPost;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkDeletePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deletePost({ postId }));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkGetCurrentUserPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/current");
  if (res.ok) {
    const currentUserPosts = await res.json();
    dispatch(loadCurrentUserPosts(currentUserPosts.posts));
    return currentUserPosts;
  } else {
    const errs = await res.json();
    return errs;
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_POSTS: {
      const newState = { ...state };
      action.posts.forEach((post) => (newState[post.id] = post));
      return newState;
    }
    case LOAD_SINGLE_POST: {
      const newState = {};
      newState[action.post.id] = { ...action.post };
      return newState;
    }
    case CREATE_POST: {
      const newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case UPDATE_POST: {
      const newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case LOAD_CURRENT_USER_POSTS: {
      const newState = { ...action.posts };
      return newState;
    }
    case DELETE_POST: {
      const newState = { ...state };

      delete newState[action.postId];

      return newState;
    }
    case RETURN_INITIAL: {
      return initialState;
    }
    default:
      return state;
  }
};

export default postReducer;
