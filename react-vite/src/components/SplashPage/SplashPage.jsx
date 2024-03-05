import { useDispatch, useSelector } from "react-redux";
import CommunityList from "../Community/CommunityList/CommunityList";
import PostList from "../Posts/PostList/PostList";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import { Link } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  const posts = Object.values(postsObj);

  return (
    <div className="splash-container">
      <PostList posts={posts} />
      <div className="details-container">
        <div className="splash-about">
          <h2>Home</h2>
          <p>Welcome to VGHaven!</p>
          <p>View posts and visit gaming communities that interest you!</p>
          <div className="create-links">
            <Link to="/posts/new" className="splash-create-link">
              Create Post
            </Link>{" "}
            <Link to="/communities/new" className="splash-create-link">
              Create Community
            </Link>
          </div>
        </div>
        <div className="splash-about">
          <h2>Dev Members</h2>
          <div className="dev-info">
            <p>
              Bryan Thompson:{" "}
              <Link to="https://github.com/bthompson1223" className="dev-link">
                Github
              </Link>{" "}
              |{" "}
              <Link
                to="https://www.linkedin.com/in/bryan-thompson-933a47251/"
                className="dev-link"
              >
                LinkedIn
              </Link>
            </p>
          </div>
        </div>
        <CommunityList />
      </div>
    </div>
  );
};

export default SplashPage;
