import { combineReducers } from "redux";
import registrationReducer from "./registration.reducer";
import loginReducer from "./login.reducer";
import salesReducer from "./sales.reducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    user: loginReducer,
    sales: salesReducer
});

export default rootReducer;