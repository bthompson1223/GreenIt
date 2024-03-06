import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { returnInitial, thunkGetOneCommunity } from "../../../redux/community";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";
import { returnInitialPosts, thunkGetAllPosts } from "../../../redux/post";
import PostList from "../../Posts/PostList/PostList";
import "./CommunityDetail.css";

const CommunityDetail = () => {
  const communityStateObj = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);
  const postsObj = useSelector((state) => state.posts);
  const communityName = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetOneCommunity(communityName.community));
    dispatch(thunkGetAllPosts());

    return () => dispatch(returnInitialPosts());
  }, [dispatch, communityName]);

  const communityObj = Object.values(communityStateObj)?.filter(
    (community) => community.community_name === communityName.community
  );

  let community;

  if (communityObj.length) {
    community = communityObj[0];
  }

  if (!community) return <h1>Community Not Found</h1>;

  const isOwner = user?.id === community.owner_id;

  const communityPosts = Object.values(postsObj).filter(
    (post) => post.community_id == communityObj[0]?.id
  );
  return (
    <div className="community-details-container">
      <div className="community-name-image">
        <img src={community.image_url} alt="Community Image" />
        <h2 className="community-detail-title">vg/{communityName.community}</h2>
      </div>
      <div className="community-post-details-rules">
        <div className="community-post-list">
          <PostList passedInPosts={communityPosts} />
        </div>

        <div className="detail-rules">
          <div className="community-detail-container">
            <div className="community-details">
              <h2>vg/{community.community_name}</h2>
              <p>{community.description}</p>
            </div>
            <div className="community-create-edit-delete">
              {user && (
                <Link
                  to={`/posts/new/?community=${community?.id}`}
                  community={community}
                >
                  Create Post
                </Link>
              )}
              {isOwner && (
                <>
                  <Link
                    to={`/communities/${communityName.community}/edit`}
                    community={communityObj}
                  >
                    Edit Community
                  </Link>
                  <OpenModalButton
                    buttonText="Delete Community"
                    modalComponent={
                      <DeleteCommunityModal community={communityObj[0]} />
                    }
                  />
                </>
              )}
            </div>
          </div>
          <div className="community-rules-container">
            <h1 className="rules-title">
              vg/{community.community_name} Rules!
            </h1>
            <ol>
              <li>Be respectful</li>
              <li>Keep posts related to community</li>
              <li>Look for the original source of your content</li>
              <li>Search for duplicates before posting</li>
            </ol>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CommunityDetail;
