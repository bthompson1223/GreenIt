import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkGetOneCommunity } from "../../../redux/community";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";

const CommunityDetail = () => {
  const communitySateObj = useSelector((state) => state.communities);
  const communityName = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetOneCommunity(communityName.community));
  }, [dispatch, communityName]);

  const communityObj = Object.values(communitySateObj)[0];
  console.log(communityObj);
  return (
    <div>
      <h2>{communityName.community}</h2>
      <Link
        to={`/communities/${communityName.community}/edit`}
        community={communityObj}
      >
        Edit
      </Link>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteCommunityModal community={communityObj} />}
      />
    </div>
  );
};

export default CommunityDetail;
