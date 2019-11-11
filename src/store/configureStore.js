import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import directInbox from "./reducers/directInbox";

const rootReducer = combineReducers({
  direct: directInbox
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
