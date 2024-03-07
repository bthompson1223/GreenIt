import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  returnInitial,
  thunkGetCurrentUserCommunities,
} from "../../../redux/community";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";
import { Link } from "react-router-dom";
import "./CurrentCommunities.css";

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
    <div className="user-community-root">
      <div className="current-community-container">
        <h2 className="community-list-title">
          {user.username}&apos;s Communities
        </h2>
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
      <div className="details-container">
        <div className="splash-about">
          <h2>Things to Try</h2>
          <p>If you're done managing your communities, try this!</p>
          <p>
            Create a post in one of your communities, or make a brand new one!
          </p>
          {user && (
            <div className="create-links">
              <Link to="/posts/new" className="splash-create-link">
                Create Post
              </Link>{" "}
              <Link to="/communities/new" className="splash-create-link">
                Create Community
              </Link>
            </div>
          )}
        </div>
        <div className="splash-about">
          <h2>Dev Members</h2>
          <div className="dev-info">
            <p>
              Bryan Thompson:{" "}
              <Link to="https://github.com/bthompson1223" className="dev-link">
                Github
              </Link>{" "}
              |{" "}
              <Link
                to="https://www.linkedin.com/in/bryan-thompson-933a47251/"
                className="dev-link"
              >
                LinkedIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentCommunities;
