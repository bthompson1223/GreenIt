import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  thunkGetOneCommunity,
  thunkUpdateCommunity,
} from "../../../redux/community";

import "./EditCommunity.css";

const EditCommunity = () => {
  const communityObj = useSelector((state) => state.communities);
  const communityParam = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const community = Object.values(communityObj)[0];
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(thunkGetOneCommunity(communityParam.community));
  }, [dispatch, communityParam]);

  useEffect(() => {
    if (community?.id) {
      setCommunityName(community.community_name);
      setDescription(community.description);
      setImageUrl(community.image_url);
    }
  }, [setCommunityName, setDescription, setImageUrl, community]);

  if (!Object.values(communityObj)) return null;

  if (!user) return <h2>You must be logged in to edit a community!</h2>;

  if (user.id != community?.owner_id) return <h2>Unauthorized</h2>;

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

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      const formData = new FormData();

      formData.append("community_name", communityName);
      formData.append("description", description);
      formData.append("image_url", imageUrl);

      setImageLoading(true);

      await dispatch(thunkUpdateCommunity(formData, communityParam.community))
        .then((updatedCommunity) => {
          navigate(`/communities/${updatedCommunity.community_name}`);
        })
        .catch(async (res) => {
          console.log("Inside create community errors catch =>", res);
        });
    }
  };

  return (
    <div className="community-create-edit">
      <h1>Add a New Community!</h1>
      <form
        className="create-community-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="community-input-div">
          <h3>What would you like your community called?</h3>
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
          <h3>Give us a great description of your community!</h3>
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
          <h3>Select a Community Image!</h3>
          <div>
            <img src={imageUrl} alt="" />
          </div>
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
            Edit Community
          </button>
        )}
        {imageLoading && <p className="loading">Loading...</p>}
      </form>
    </div>
  );
};

export default EditCommunity;
