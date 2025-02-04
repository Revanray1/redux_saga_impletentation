import { persistReducer } from "redux-persist"; //  for presist
import { storageKeys } from "../../../utils/constants";
import { UserDetailsActions } from "./actions";
import {SampleUserData } from "./dataTypes";
import * as actionTypes from "./types";
import storage from "../../common/storage";
// const storage = storageData;

type UserDetailsState = {
  sampleUserData: SampleUserData[] | null,
  loader: {
    sampleUserData: boolean,
  };
};

const initialState: UserDetailsState = {
  sampleUserData: null,
  loader: {
    sampleUserData: false,
  },
};

const UserDetailsReducer = (state: UserDetailsState = initialState, action: UserDetailsActions | LogoutSuccessAction | LogoutFailedAction): UserDetailsState => {
  switch (action.type) {
    // sales-unit-for-noc
    case actionTypes.GET_USER_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          sampleUserData: true,
        },
      };

    case actionTypes.GET_USER_DATA_SUCCEEDED:
      return {
        ...state,
        sampleUserData: action.result.data,
        loader: {
          ...state.loader,
          sampleUserData: false,
        },
      };

    case actionTypes.GET_USER_DATA_RESET:
      return {
        ...state,
        sampleUserData: initialState?.sampleUserData,
        loader: {
          ...state.loader,
          sampleUserData: false,
        },
      };

    case actionTypes.GET_USER_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          sampleUserData: false,
        },
      };


    default:
      return state;
  }
};


const config = {
  storage,
  key: storageKeys.externalNoc, // The key is a unique identifier that will be used to store and retrieve the persisted Redux state from the storage.
  blacklist: ["loader", "userDetails"], // topic will not be persisted
};

export default persistReducer(config, UserDetailsReducer);
