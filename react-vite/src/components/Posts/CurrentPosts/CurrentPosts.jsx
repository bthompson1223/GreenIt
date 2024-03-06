import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  returnInitialPosts,
  thunkGetCurrentUserPosts,
} from "../../../redux/post";
import PostList from "../PostList/PostList";

const CurrentPosts = () => {
  const user = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetCurrentUserPosts());

    return () => dispatch(returnInitialPosts());
  }, [dispatch]);

  if (!user) return <h1>You must be logged in to see your current posts!</h1>;
  if (!Object.values(postsObj).length) return <h1>No Posts Yet!</h1>;

  const posts = Object.values(postsObj);

  return (
    <div className="user-posts-container">
      <h2>{user.username}&apos;s Posts</h2>
      <PostList passedInPosts={posts} />
    </div>
  );
};

export default CurrentPosts;
