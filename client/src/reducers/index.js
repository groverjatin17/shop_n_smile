import { combineReducers } from "redux";
import homepageReducers from "./homepageReducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    homepageReducers,
    form: formReducer,
});

export default rootReducer;
