import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../types/login.types";

export const loginStart = () => ({
    type: LOGIN_START
});
  
export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    data
});

export const loginFail = (error) => ({
    type: LOGIN_FAILURE,
    error,
});

export const logout = (error) => ({
    type: LOGOUT,
    error,
});