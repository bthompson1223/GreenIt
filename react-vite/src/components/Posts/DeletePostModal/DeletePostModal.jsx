import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { thunkDeletePost } from "../../../redux/post";
import "./DeletePostModal.css";

const DeletePostModal = ({ post }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeletePost(post.id));
    closeModal();
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  console.log("inside delete community modal", post);

  return (
    <div className="delete-post-modal post-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this post?</p>
      <button id="post-delete-yes-btn" onClick={handleDelete}>
        Yes (Delete Post)
      </button>
      <button id="post-delete-no-btn" onClick={handleCancel}>
        No (Keep Post)
      </button>
    </div>
  );
};

export default DeletePostModal;
