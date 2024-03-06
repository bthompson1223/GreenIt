import { Link } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import "./PostList.css";
import { useSelector } from "react-redux";

const PostList = ({ posts }) => {
  const user = useSelector((state) => state.session.user);
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
              <Link
                to={`/posts/${post.id}`}
                className={
                  post.owner_id === user?.id
                    ? "post-details"
                    : "post-details not-owner"
                }
              >
                <div className="post-details-title">
                  <h3>{post.title}</h3>
                </div>
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt="Post image"
                    className="post-image"
                  />
                ) : (
                  <div className="post-image line"></div>
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
              {post.owner_id === user?.id ? (
                <div className="post-edit-delete post-list-edit-delete">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="small-edit-delete"
                  >
                    Edit
                  </Link>
                  <OpenModalButton
                    className="small-edit-delete"
                    buttonText="Delete"
                    modalComponent={<DeletePostModal post={post} />}
                  />
                </div>
              ) : (
                <>
                  <div className="empty-container"></div>
                  <div className="empty-container"></div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
