const GET_NAV_COMMUNITIES = "navCommunity/GET_NAV_COMMUNITIES";
const REMOVE_NAV_COMMUNITY = "navCommunity/REMOVE_NAV_COMMUNITY";
const ADD_NAV_COMMUNITY = "navCommunity/ADD_NAV_COMMUNITY";
const EDIT_NAV_COMMUNITY = "navCommunity/EDIT_NAV_COMMUNITY";

const getNavCommunities = (communities) => {
  return {
    type: GET_NAV_COMMUNITIES,
    communities,
  };
};

export const removeNavCommunity = (communityId) => {
  return {
    type: REMOVE_NAV_COMMUNITY,
    communityId,
  };
};

export const addNavCommunity = (community) => {
  return {
    type: ADD_NAV_COMMUNITY,
    community,
  };
};

export const editNavCommunity = (community) => {
  return {
    type: EDIT_NAV_COMMUNITY,
    community,
  };
};

export const thunkGetNavCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities/");
  if (response.ok) {
    const communities = await response.json();
    dispatch(getNavCommunities(communities));
  } else {
    errs = await response.json();
    return errs;
  }
};

const initialState = {};

const navCommunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAV_COMMUNITIES: {
      const newState = {};
      action.communities.forEach((community) => {
        newState[community.id] = community;
      });
      return newState;
    }
    case REMOVE_NAV_COMMUNITY: {
      const newState = { ...state };
      delete newState[action.communityId];
      return newState;
    }
    case ADD_NAV_COMMUNITY: {
      return {
        ...state,
        [action.community.id]: action.community,
      };
    }
    case EDIT_NAV_COMMUNITY: {
      return {
        ...state,
        [action.community.id]: action.community,
      };
    }
    default:
      return state;
  }
};

export default navCommunityReducer;
