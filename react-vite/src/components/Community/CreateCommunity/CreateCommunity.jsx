import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateCommunity } from "../../../redux/community";

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

    if (!communityName)
      validationErrors.communityName = "Community name is required";
    if (!description) validationErrors.description = "Description is required";
    if (!imageUrl) validationErrors.imageUrl = "Image is required";

    if (communityName.length > 255)
      validationErrors.communityName =
        "Community name must be less than 255 characters";

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
          navigate(`/communities/${createdCommunity.community_name}`);
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
              className="input-create"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunity;
