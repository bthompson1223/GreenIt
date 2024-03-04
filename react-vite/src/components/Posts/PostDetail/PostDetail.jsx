import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { returnInitialPosts, thunkGetSinglePost } from "../../../redux/post";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeletePostModal from "../DeletePostModal/DeletePostModal";

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
  console.log("Post, postId param, postObj =>", post, postId, postObj);

  return (
    <div>
      <div>
        <Link to={`/communities/${post.community.community_name}`}>
          <p>vg/{post.community.community_name}</p>
        </Link>
        <p>Posted by {post.poster.username}</p>
      </div>
      <div>
        <div>{post.title}</div>
        <div>
          {post.image_url && <img src={post.image_url} alt="post-image" />}
        </div>
        <div>
          <p>{post.body}</p>
        </div>
      </div>
      <Link to={`/posts/${postId}/edit`}>Edit Post</Link>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeletePostModal post={post} />}
      />
    </div>
  );
};

export default PostDetail;
