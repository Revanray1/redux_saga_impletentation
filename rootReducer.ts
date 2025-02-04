import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "./login/reducer";
import commonReducer from "./common/reducer";
import projectReducer from "./project/reducer";
import externalNOCReducer from "./external-noc/reducer";
import userDetailsReducer from "./service/userDetails/reducer"
import storage from "../common/storage";
import manageRequestReducer from "./manage-request/reducer";
import { storageKeys } from "../../utils/constants";
import { LOGOUT_FAILED, LOGOUT_SUCCEEDED } from "./login/types";
import ManageDocsUpdateReducer from "./manage-docs/reducer";
import appStore from "../common/store";

export const globalConfig = {
  storage,
};

const config = {
  ...globalConfig,
  key: storageKeys.root,
  whitelist: [],
  // whitelist: ["project", "hdfcAuth"],
  // blacklist: ["manageDocsUpdate"], // topic will not be persisted
};

const appReducer = combineReducers({
  // manageRequest: manageRequestReducer,
  // Auth: authReducer,
  // project: projectReducer,
  // commonReducer: commonReducer,
  userDetails: userDetailsReducer,
  // manageDocsUpdate: ManageDocsUpdateReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

// export default persistReducer(config, rootReducer);
export default rootReducer;
