const GET_COMMUNITIES = "communities/GET_COMMUNITIES";
const CREATE_COMMUNITY = "communities/CREATE_COMMUNITY";

const getCommunities = (communities) => {
  return {
    type: GET_COMMUNITIES,
    communities,
  };
};

const createCommunity = (community) => {
  return {
    type: CREATE_COMMUNITY,
    community,
  };
};

export const thunkGetCommunities = () => async (dispatch) => {
  const res = await fetch("/api/communities/");
  if (res.ok) {
    const communities = await res.json();
    dispatch(getCommunities(communities));
  } else {
    const errs = res.json();
    return errs;
  }
};

export const thunkCreateCommunity = (formData) => async (dispatch) => {
  const res = await fetch("/api/communities/new", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const community = res.json();
    dispatch(createCommunity(community));
    return community;
  } else {
    const errs = res.json();
    return errs;
  }
};

const initialState = {};

function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITIES: {
      const newState = { ...state };
      action.communities.forEach(
        (community) => (newState[community.id] = community)
      );
      return newState;
    }
    case CREATE_COMMUNITY: {
      const newState = { ...state };
      newState[action.community.id] = action.community;
      return newState;
    }
    default:
      return state;
  }
}

export default communitiesReducer;
