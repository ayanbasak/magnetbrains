import { REGISTRATION_FAILURE, REGISTRATION_SUCCESS, REGISTRATION_START } from "../types/registration.types.js";

export const registrationStart = () => ({
    type: REGISTRATION_START
});
  
export const registrationSuccess = (data) => ({
    type: REGISTRATION_SUCCESS,
    data
});

export const registrationFail = (error) => ({
    type: REGISTRATION_FAILURE,
    error,
});