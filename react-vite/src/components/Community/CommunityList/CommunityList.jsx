import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { returnInitial, thunkGetCommunities } from "../../../redux/community";
import { Link } from "react-router-dom";

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
    <div>
      <ul>
        {communities.map((community) => (
          <li key={community.id}>
            <Link
              to={`/communities/${community.community_name}`}
              community={community}
            >
              {community.community_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
