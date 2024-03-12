import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateCommunity } from "../../../redux/community";
import "./CreateCommunity.css";

const CreateCommunity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  if (!user) return <h2>You must be logged in to create a community!</h2>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = {};

    if (!communityName.length)
      validationErrors.communityName = "Community name is required";
    if (!description) validationErrors.description = "Description is required";
    if (!imageUrl) validationErrors.imageUrl = "Image is required";

    if (communityName.length > 60)
      validationErrors.communityName =
        "Community name must be less than 60 characters";

    if (description.length > 500)
      validationErrors.description =
        "Description must be less than 500 characters";

    description.split(" ").forEach((word) => {
      if (word.length > 50) {
        validationErrors.description = `Each word must be 50 characters or less, please change ${word.slice(
          0,
          65
        )}...`;
      }
    });

    const re = /^[a-zA-Z0-9_]+$/;
    re.test(communityName)
      ? null
      : (validationErrors.communityName = "Name can't have special characters");

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      const formData = new FormData();

      formData.append("community_name", communityName);
      formData.append("description", description);
      formData.append("image_url", imageUrl);

      setImageLoading(true);

      await dispatch(thunkCreateCommunity(formData))
        .then((createdCommunity) => {
          console.log(createdCommunity);
          if (createdCommunity.errors) {
            setErrors(createdCommunity.errors);
            setImageLoading(false);
            return;
          } else {
            navigate(`/communities/${createdCommunity.community_name}`);
          }
        })
        .catch(async (res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="community-create-edit">
      <h1 className="community-add-edit">Add a New Community!</h1>
      <form
        className="create-community-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="community-input-div">
          <h3>
            <span className="required-form">* </span>What would you like your
            community called?
          </h3>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              placeholder="What's your community name?"
              className="input-create desc"
            />
          </label>
        </div>
        <div className="community-errors">
          {errors.communityName && <p>{errors.communityName}</p>}
        </div>
        <div className="community-input-div">
          <h3>
            <span className="required-form">* </span>Give us a great description
            of your community!
          </h3>
          <label htmlFor="description">
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your community"
              className="input-create desc"
            />
          </label>
        </div>
        <div className="community-errors">
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div className="community-input-div">
          <h3>
            <span className="required-form">* </span>Select a Community Image!
          </h3>
          <label htmlFor="imageUrl">
            <input
              name="imageUrl"
              type="file"
              accept="image/*"
              onChange={(e) => setImageUrl(e.target.files[0])}
              className="input-create"
            />
          </label>
        </div>
        <div className="community-errors">
          {errors.imageUrl && <p>{errors.imageUrl}</p>}
        </div>
        {!imageLoading && (
          <button type="submit" className="create-a-community button">
            Create Community
          </button>
        )}
        {imageLoading && <p className="loading">Loading...</p>}
        <div className="community-errors">
          {errors.message && <p>{errors.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateCommunity;
