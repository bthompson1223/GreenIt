import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const hasProfileImg = user?.profile_img;
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const profileImage = hasProfileImg ? (
    <img
      src={user?.profile_img}
      alt="Profile Image"
      className="profile-image"
    />
  ) : (
    <img
      className="profile-image"
      src="https://launch-pad-group-project.s3.us-west-1.amazonaws.com/48-512.png"
      alt="Profile Image"
    />
  );

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profile-button-container" onClick={toggleMenu}>
        {profileImage}
        <div className="info">
          <p>{user ? `u/${user.username}` : "Log in/Sign up!"}</p>
        </div>
      </div>

      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className="text">{user.username}</li>
              <li className="text-email">{user.email}</li>
              <li>
                <Link
                  to={`/posts/current/?user=${user?.username}`}
                  onClick={closeMenu}
                >
                  My Posts
                </Link>
              </li>
              <li>
                <Link to="/communities/current" onClick={closeMenu}>
                  My Communities
                </Link>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <div className="login-logout">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
