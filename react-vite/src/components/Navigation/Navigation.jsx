import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdVideogameAsset } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetNavCommunities } from "../../redux/navCommunity";
import Search from "../Search/SearchBar/Search";

function Navigation() {
  const navigate = useNavigate();
  const navCommunitiesObj = useSelector((state) => state.navCommunities);
  const communities = Object.values(navCommunitiesObj);
  const dispatch = useDispatch();
  const communityObj = useSelector((state) => state.communities);
  const community = Object.values(communityObj);

  useEffect(() => {
    dispatch(thunkGetNavCommunities());
  }, [dispatch]);

  if (!communities.length) return null;
  // if (!community.length) return null;

  const options = communities.map((community) => (
    <option
      key={community.id}
      value={community.community_name}
      onClick={(e) => {
        console.log(e.target.value);
        if (e.target.value === "/") navigate("/");
        else navigate(`/communities/${e.target.value}`);
      }}
      className="community-dropdown-option"
    >
      vg/{community.community_name}
    </option>
  ));

  const houseEmoji = "\u{1F3E0}";

  return (
    <ul className="nav-container">
      <li className="logo-container">
        <div className="logo-li">
          <NavLink to="/">
            <MdVideogameAsset />
          </NavLink>
          <NavLink to="/" className="logo">
            VGHaven
          </NavLink>
        </div>
        <div className="community-dropdown">
          <select
            name="communities"
            id="community-nav-dropdown"
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "/") navigate("/");
              else navigate(`/communities/${e.target.value}`);
            }}
            defaultValue="/"
          >
            <option value="/" onChange={() => navigate("/")}>
              {houseEmoji} Home
            </option>
            {options}
          </select>
        </div>
      </li>

      <li className="search-li">
        <Search />
      </li>

      <li className="button-container">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;

//Can I have a house emoji for the home option in the dropdown
