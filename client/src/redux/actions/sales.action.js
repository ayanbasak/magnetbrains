import { ADD_SALES_DATA_ERROR, ADD_SALES_DATA_START, ADD_SALES_DATA_SUCCESS, GET_SALES_DATA_ERROR, GET_SALES_DATA_START, GET_SALES_DATA_SUCCESS } from "../types/sales.types";

export const addSalesDataStart = () => ({
    type: ADD_SALES_DATA_START
});
  
export const addSalesDataSuccess = (data) => ({
    type: ADD_SALES_DATA_SUCCESS,
    data
});

export const addSalesDataFail = (error) => ({
    type: ADD_SALES_DATA_ERROR,
    error,
});


export const getSalesDataStart = () => ({
    type: GET_SALES_DATA_START
});
  
export const getSalesDataSuccess = (data) => ({
    type: GET_SALES_DATA_SUCCESS,
    data
});

export const getSalesDataFail = (error) => ({
    type: GET_SALES_DATA_ERROR,
    error,
});
