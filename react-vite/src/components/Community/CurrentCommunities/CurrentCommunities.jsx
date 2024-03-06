import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  returnInitial,
  thunkGetCurrentUserCommunities,
} from "../../../redux/community";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";
import { Link } from "react-router-dom";

const CurrentCommunities = () => {
  const communitiesObj = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetCurrentUserCommunities());
    return () => dispatch(returnInitial());
  }, [dispatch]);

  if (!communitiesObj) return null;
  if (!user) return <h2>You must be logged in to see your communities!</h2>;

  const communities = Object.values(communitiesObj);

  return (
    <div className="community-list-container">
      <h2 className="community-list-title">Communities</h2>
      {!communities.length && <h3>No communities yet!</h3>}
      <ul className="community-list">
        {communities.map((community) => (
          <li key={community.id}>
            <div className="community-link-container">
              <Link
                to={`/communities/${community.community_name}`}
                community={community}
                className="community-link"
              >
                vg/{community.community_name}
              </Link>

              {community.owner_id === user?.id ? (
                <div className="tiny-edit-delete">
                  <Link
                    to={`/communities/${community.community_name}/edit`}
                    className="small-edit-delete"
                  >
                    Edit
                  </Link>
                  <OpenModalButton
                    className="small-edit-delete"
                    buttonText="Delete"
                    modalComponent={
                      <DeleteCommunityModal community={community} />
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="empty-container"></div>
                  <div className="empty-container"></div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentCommunities;
