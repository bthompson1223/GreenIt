import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = ({ posts }) => {
  if (!posts) return null;

  return (
    <div className="post-list-container">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <div>
                <Link to={`/communities/${post.community.community_name}`}>
                  vg/{post.community.community_name}
                </Link>{" "}
                Posted by u/
                {post.poster.username}
              </div>
              <Link to={`/posts/${post.id}`}>
                <p>{post.title}</p>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="post-image"
                  />
                )}
                <p>{post.body}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
