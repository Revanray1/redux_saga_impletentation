import { DownloadRowDataActions } from "./action";
import { CommonType, DOWNLOAD_ROW_DATA_FAILED, DOWNLOAD_ROW_DATA_REQUESTED, DOWNLOAD_ROW_DATA_SUCCEEDED } from "./types";
import { persistReducer } from "redux-persist";
import { storageKeys } from "../../../utils/constants";
import storage from "../../common/storage";
import * as _ from "lodash";
import { LOGOUT_SUCCEEDED, LOGOUT_FAILED } from "../login/types";
import { LogoutFailedAction, LogoutSuccessAction } from "../login/actions";

interface initialStateType {
  isFullScreen: boolean;
  numberSystem: string;
  unitNumberSystem: string;
  loader: {
    downloadViewDocumentRow: boolean;
  };
}

export const initialState: initialStateType = {
  isFullScreen: false,
  numberSystem: "INR cr",
  unitNumberSystem: "INR Lacs",
  loader: {
    downloadViewDocumentRow: false,
  },
};

interface Action {
  type: string;
  isFullScreen: boolean;
  numberSystem: string;
  unitNumberSystem: string;
  loader: {
    downloadViewDocumentRow: boolean;
  };
}

const commonReducer = (state: initialStateType = initialState, action: DownloadRowDataActions | Action  | LogoutSuccessAction | LogoutFailedAction): initialStateType => {
  switch (action.type) {
    case CommonType.SET_FULLSCREEN:
      return {
        ...state,
        isFullScreen: action.isFullScreen,
      };
    case CommonType.SET_DISPLAY_NUMBER_SYSTEM:
      return {
        ...state,
        numberSystem: action.numberSystem,
        unitNumberSystem: action.unitNumberSystem,
      };
    case CommonType.SET_DISPLAY_UNIT_NUMBER_SYSTEM:
      return {
        ...state,
        unitNumberSystem: action.unitNumberSystem,
      };
    case DOWNLOAD_ROW_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadViewDocumentRow: true,
        },
      };
    case DOWNLOAD_ROW_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadViewDocumentRow: false,
        },
      };
    case DOWNLOAD_ROW_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadViewDocumentRow: false,
        },
      };
      case LOGOUT_SUCCEEDED:
        return _.cloneDeep(initialState);
  
      case LOGOUT_FAILED:
        return _.cloneDeep(initialState);
    default:
      return state;
  }
};

const config = {
  storage,
  key: storageKeys.common,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, commonReducer);
