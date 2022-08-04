import { REGISTRATION_FAILURE, REGISTRATION_START, REGISTRATION_SUCCESS } from "../types/registration.types";

const initialState = {
    loading: false,
    error: null,
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_START:
      return { ...state, loading: true };

    case REGISTRATION_SUCCESS:
      return { ...state, loading: false, error: null };

    case REGISTRATION_FAILURE:
        return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
