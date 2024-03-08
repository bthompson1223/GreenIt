import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  returnInitialPosts,
  thunkGetCurrentUserPosts,
} from "../../../redux/post";
import PostList from "../PostList/PostList";
import "./CurrentPosts.css";
import { Link } from "react-router-dom";

const CurrentPosts = () => {
  const user = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(returnInitialPosts());
    dispatch(thunkGetCurrentUserPosts());

    return () => dispatch(returnInitialPosts());
  }, [dispatch]);

  if (!user) return <h1>You must be logged in to see your current posts!</h1>;
  if (!Object.values(postsObj).length) return <h1>No Posts Yet!</h1>;

  const posts = Object.values(postsObj).filter(
    (post) => post.owner_id === user.id
  );

  return (
    <div className="user-post-root">
      <div className="user-posts-container">
        <PostList passedInPosts={posts} />
      </div>
      <div className="current-posts-details-container">
        <div className="splash-about">
          <h2>Things to Try</h2>
          <p>If you're done managing your posts, try this!</p>
          <p>
            Create a post in one of our communities, or make a brand new one!
          </p>
          {user && (
            <div className="create-links">
              <Link to="/posts/new" className="splash-create-link">
                Create Post
              </Link>{" "}
              <Link to="/communities/new" className="splash-create-link">
                Create Community
              </Link>
            </div>
          )}
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
      </div>
    </div>
  );
};

export default CurrentPosts;
