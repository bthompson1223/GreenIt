import { useDispatch, useSelector } from "react-redux";
import CommunityList from "../Community/CommunityList/CommunityList";
import PostList from "../Posts/PostList/PostList";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import { Link } from "react-router-dom";

const SplashPage = () => {
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  const posts = Object.values(postsObj);

  return (
    <div>
      <Link to="/posts/new">Create Post</Link>{" "}
      <Link to="/communities/new">Create Community</Link>
      <CommunityList />
      <PostList posts={posts} />
    </div>
  );
};

export default SplashPage;
