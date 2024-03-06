import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { returnInitial, thunkDeleteCommunity } from "../../../redux/community";
import { useNavigate } from "react-router-dom";
import "./DeleteCommunityModal.css";

const DeleteCommunityModal = ({ community }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteCommunity(community[0].id));
    dispatch(returnInitial());
    closeModal();
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-community-modal community-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this community?</p>
      <button id="community-delete-yes-btn" onClick={handleDelete}>
        Yes (Delete Community)
      </button>
      <button id="community-delete-no-btn" onClick={handleCancel}>
        No (Keep Community)
      </button>
    </div>
  );
};

export default DeleteCommunityModal;
