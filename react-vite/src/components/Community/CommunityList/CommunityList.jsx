import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { returnInitial, thunkGetCommunities } from "../../../redux/community";
import { Link } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";
import "./CommunityList.css";

const CommunityList = () => {
  const communitiesObj = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);
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
            <div className="community-link-container">
              <Link
                to={`/communities/${community.community_name}`}
                community={community}
                className="community-link"
              >
                vg/{community.community_name.slice(0, 17)}
                {community.community_name.length !==
                  community.community_name.slice(0, 50).length && (
                  <span>...</span>
                )}
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

export default CommunityList;
