import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { returnInitial, thunkGetOneCommunity } from "../../../redux/community";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommunityModal from "../DeleteCommunityModal/DeleteCommunityModal";
import { thunkGetAllPosts } from "../../../redux/post";
import PostList from "../../Posts/PostList/PostList";

const CommunityDetail = () => {
  const communityStateObj = useSelector((state) => state.communities);
  const postsObj = useSelector((state) => state.posts);
  const communityName = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetOneCommunity(communityName.community));
    dispatch(thunkGetAllPosts());
  }, [dispatch, communityName]);

  const communityObj = Object.values(communityStateObj)?.filter(
    (community) => community.community_name === communityName.community
  );

  let community;

  if (communityObj.length) {
    community = communityObj[0];
  }

  console.log("posts", communityObj);
  const communityPosts = Object.values(postsObj).filter(
    (post) => post.community_id == communityObj[0]?.id
  );
  return (
    <div>
      <h2>{communityName.community}</h2>
      <Link
        to={`/communities/${communityName.community}/edit`}
        community={communityObj}
      >
        Edit
      </Link>{" "}
      <Link to="/posts/new" community={community}>
        Create Post
      </Link>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteCommunityModal community={communityObj} />}
      />
      <div>
        <PostList posts={communityPosts} />
      </div>
    </div>
  );
};

export default CommunityDetail;
