import { REGISTRATION_FAILURE, REGISTRATION_START, REGISTRATION_SUCCESS } from "../types/registration.types";
import { ADD_SALES_DATA_ERROR, ADD_SALES_DATA_START, ADD_SALES_DATA_SUCCESS, GET_SALES_DATA_ERROR, GET_SALES_DATA_START, GET_SALES_DATA_SUCCESS } from "../types/sales.types";

const initialState = {
    loading: false,
    sales: [],
    error: null,
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SALES_DATA_START:
      return { ...state, loading: true };

    case ADD_SALES_DATA_SUCCESS:
        // console.log(">>> ADD_SALES_DATA_SUCCESS: " , action.data)
      return { ...state, loading: false, error: null };

    case ADD_SALES_DATA_ERROR:
        return { ...state, loading: false };

    case GET_SALES_DATA_START:
        return { ...state, loading: true };

    case GET_SALES_DATA_SUCCESS:
        // console.log(">>> 11 GET_SALES_DATA_SUCCESS: " , action.data)
        return { ...state, loading: false, sales: action.data};
            
    case GET_SALES_DATA_ERROR:
        return { ...state, loading: false };
    default:
      return state;
  }
};
