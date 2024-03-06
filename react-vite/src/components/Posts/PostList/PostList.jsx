import { Link } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import "./PostList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../../redux/post";

const PostList = ({ passedInPosts }) => {
  const user = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!passedInPosts) dispatch(thunkGetAllPosts());
  }, [dispatch]);

  const posts = passedInPosts ? passedInPosts : Object.values(postsObj);

  if (!posts.length) {
    return (
      <div className="post-list-container">
        <h2>Posts</h2>
        <h3>No Posts Yet!</h3>
      </div>
    );
  }

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
                  vg/{post.community.community_name.slice(0, 25)}
                  {post.community.community_name.length !==
                    post.community.community_name.slice(0, 50).length && (
                    <span>...</span>
                  )}
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
                  <h3>
                    {post.title.slice(0, 50)}
                    {post.title.length !== post.title.slice(0, 50).length && (
                      <span>...</span>
                    )}
                  </h3>
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
