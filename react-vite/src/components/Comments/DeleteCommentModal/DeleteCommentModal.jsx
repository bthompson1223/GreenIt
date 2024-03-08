import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment, thunkGetComments } from "../../../redux/comments";
import "./DeleteCommentModal.css";

export const DeleteCommentModal = ({ comment }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { postId } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteComment(postId, comment.id));
    dispatch(thunkGetComments(postId));
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-comment-modal comment-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this comment?</p>
      <button id="comment-delete-yes-btn" onClick={handleDelete}>
        Yes (Delete Comment)
      </button>
      <button id="comment-delete-no-btn" onClick={handleCancel}>
        No (Keep Comment)
      </button>
    </div>
  );
};
