import { useDispatch, useSelector } from "react-redux";
import CommunityList from "../Community/CommunityList/CommunityList";
import PostList from "../Posts/PostList/PostList";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../redux/post";

const SplashPage = () => {
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  const posts = Object.values(postsObj);

  return (
    <div>
      <CommunityList />
      <PostList posts={posts} />
    </div>
  );
};

export default SplashPage;
