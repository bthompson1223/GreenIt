import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = ({ posts }) => {
  if (!posts) return null;

  return (
    <div className="post-list-container">
      <h2>Posts</h2>
      <ul className="post-list">
        {!posts.length && <h3>No posts yet!</h3>}
        {posts.map((post) => (
          <li key={post.id}>
            <div className="post-container">
              <div className="post-community-details">
                <Link
                  to={`/communities/${post.community.community_name}`}
                  className="post-community-link"
                >
                  vg/{post.community.community_name}
                </Link>{" "}
                Posted by u/
                {post.poster.username}
              </div>
              <Link to={`/posts/${post.id}`} className="post-details">
                <div className="post-details-title">
                  <h3>{post.title}</h3>
                </div>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="post-image"
                  />
                )}
                <div className="post-details-body">
                  <p>
                    {post.body.slice(0, 50)}
                    {post.body.length !== post.body.slice(0, 50).length && (
                      <span>...</span>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
