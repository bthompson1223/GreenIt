import { useParams } from "react-router-dom";

const CommunityDetail = () => {
  const community = useParams();
  console.log(community.community);
  return <h2>{community.community}</h2>;
};

export default CommunityDetail;
