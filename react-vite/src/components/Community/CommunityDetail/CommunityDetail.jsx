import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkGetOneCommunity } from "../../../redux/community";
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

  console.log("posts", postsObj);

  const communityObj = Object.values(communityStateObj)[0];

  const communityPosts = Object.values(postsObj).filter(
    (post) => post.community_id == communityObj?.id
  );
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

      <div>
        <PostList posts={communityPosts} />
      </div>
    </div>
  );
};

export default CommunityDetail;
