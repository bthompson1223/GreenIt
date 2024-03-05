import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { returnInitialPosts, thunkGetSinglePost } from "../../../redux/post";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import "./PostDetail.css";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const postObj = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetSinglePost(postId));

    return () => dispatch(returnInitialPosts());
  }, [dispatch]);

  if (!Object.values(postObj).length) return null;

  const post = Object.values(postObj).filter((post) => post.id == postId)[0];

  const isOwner = user?.id === post.owner_id;

  return (
    <div className="post-page">
      <div className="post-detail-container">
        <div className="post-info">
          <Link
            to={`/communities/${post.community.community_name}`}
            className="community-link"
          >
            vg/{post.community.community_name}
          </Link>
          <p>Posted by u/{post.poster.username}</p>
        </div>
        <div className="post-details details">
          <div className="post-details-title">
            <p>{post.title}</p>
          </div>
          <div className="post-image-container">
            {post.image_url && (
              <img
                src={post.image_url}
                alt="post-image"
                className="post-detail-image"
              />
            )}
          </div>
          <div className="post-details-body-container">
            <p className="post-details-body">{post.body}</p>
          </div>
        </div>
        {isOwner && (
          <div className="post-edit-delete">
            <Link to={`/posts/${postId}/edit`}>Edit Post</Link>
            <OpenModalButton
              buttonText="Delete Post"
              modalComponent={<DeletePostModal post={post} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
