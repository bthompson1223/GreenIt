import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { returnInitial, thunkGetCommunities } from "../../../redux/community";
import { Link } from "react-router-dom";
import "./CommunityList.css";

const CommunityList = () => {
  const communitiesObj = useSelector((state) => state.communities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetCommunities());
    return () => dispatch(returnInitial());
  }, [dispatch]);

  if (!communitiesObj) return null;

  const communities = Object.values(communitiesObj);

  return (
    <div className="community-list-container">
      <h2 className="community-list-title">Communities</h2>
      <ul className="community-list">
        {communities.map((community) => (
          <li key={community.id}>
            <Link
              to={`/communities/${community.community_name}`}
              community={community}
              className="community-link"
            >
              vg/{community.community_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
