const GET_COMMUNITIES = "communities/GET_COMMUNITIES";
const CREATE_COMMUNITY = "communities/CREATE_COMMUNITY";
const GET_ONE_COMMUNITY = "communities/GET_ONE_COMMUNITY";
const UPDATE_COMMUNITY = "communities/UPDATE_COMMUNITY";

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

const getOneCommunity = (community) => {
  return {
    type: GET_ONE_COMMUNITY,
    community,
  };
};

const updateCommunity = (community) => {
  return {
    type: UPDATE_COMMUNITY,
    community,
  };
};

export const thunkGetCommunities = () => async (dispatch) => {
  const res = await fetch("/api/communities/");
  if (res.ok) {
    const communities = await res.json();
    dispatch(getCommunities(communities));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkCreateCommunity = (formData) => async (dispatch) => {
  const res = await fetch("/api/communities/new", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const community = await res.json();
    dispatch(createCommunity(community));
    return community;
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkGetOneCommunity = (community) => async (dispatch) => {
  const res = await fetch(`/api/communities/${community}`);

  if (res.ok) {
    const community = await res.json();
    dispatch(getOneCommunity(community));
  } else {
    const errs = await res.json();
    return errs;
  }
};

export const thunkUpdateCommunity = (formData) => async (dispatch) => {
  const res = await fetch(`/api/communities/${formData.community_name}/edit`, {
    method: "PUT",
    body: formData,
  });

  if (res.ok) {
    const community = await res.json();
    dispatch(updateCommunity(community));
    return community;
  } else {
    const errs = await res.json();
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
    case GET_ONE_COMMUNITY: {
      const newState = { ...state };
      newState[action.community.id] = action.community;
      return newState;
    }
    default:
      return state;
  }
}

export default communitiesReducer;
