import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  if (!posts) return null;

  return (
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
              {post.image_url && <img src={post.image_url} alt="Post image" />}
              <p>{post.body}</p>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
