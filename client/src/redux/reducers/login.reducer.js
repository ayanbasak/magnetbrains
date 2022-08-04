import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../types/login.types";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  token: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {...state, loading: true};

    case LOGIN_SUCCESS:
      return {...state, loading: false, user: action.data.username, isAuthenticated: true, token: action.data.token};

    case LOGIN_FAILURE:
        return {...state, loading: false};

    case LOGOUT:
        return {...state, user: null, isAuthenticated: false, token: undefined};
    default:
      return state;
  }
};
