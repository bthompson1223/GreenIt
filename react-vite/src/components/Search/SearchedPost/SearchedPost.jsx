import { useNavigate } from "react-router-dom";
import "./SearchedPost.css";

const SearchedPost = ({ post, setSearchValue }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setSearchValue("");
    navigate(`/posts/${post.id}`);
  };

  return (
    <li className="searched-post-li" onClick={handleClick}>
      <div className="searched-post-img-div">
        <img
          src={post.image_url}
          alt={post.title}
          className="searched-post-img"
        />
      </div>
      <div className="searched-post-info">
        <h2>{post.title}</h2>
        <p>Posted by: u/{post.poster.username}</p>
      </div>
    </li>
  );
};

export default SearchedPost;
