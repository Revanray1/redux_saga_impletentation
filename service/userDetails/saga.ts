import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { selectAccessToken } from "../login/selectors"; // for Login data like Access Token from login selectors
import {
  FetchSampleUserDataRequestedType,
  FetchSampleUserDataSucceeded,
  FetchSampleUserDataSucceededType,
} from "./actions";
import   {
  GetUserRequestAPI
} from "./api";
import * as actionTypes from "./types";
import { errorNotification, handelReponseCode, successNotification } from "../../utils/utilityToHandleNotification";  // Component for Successnotification Handling
import { FAILED_TO_CONNECT_NETWORK, networkErrorCode } from "../../utils/constants";
import {handleError} from "../../api/commons";
import { SampleUserDataTypesResponse } from "./dataTypes";

function* handleGetUserDetails(action: FetchSampleUserDataRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SampleUserDataTypesResponse | null = yield call(GetUserRequestAPI, accessToken, action.userId);  // rest param in actions
    // Success notification and modal handling
     // here resposne.infor take APIresponse types
    if (response == null || response?.info?.code != 100) { 
      throw new Error(response?.info?.message || "API Call Failed.");
    } else {
      const next: FetchSampleUserDataSucceededType = yield call(FetchSampleUserDataSucceeded, response);
      yield call(successNotification, response.info.message || "User details successfully.");
      // yield call(closeAllModals);
      yield put(next);
      if (action.callback) {
        yield call(action.callback, true, response?.info?.message?response?.info?.message:"User details get successfully...");
      }
    }
  } catch (error: any) {
    let errorMessage = error?.info?.message || "Failed to get User details";
    if (action.callback) {
      if (error?.message) {
        errorMessage = error.message;
      }
      yield call(action.callback, false, errorMessage);
    } else {
      yield call(errorNotification, errorMessage);
    }
    yield put({
      type: actionTypes.GET_USER_DATA_FAILED,
      message: "",
    });
  }
}



function* UserDetailsSaga() {
  yield takeEvery(actionTypes.GET_USER_DATA_REQUESTED, handleGetUserDetails);

  // yield takeLeading();  also you can use Leading based on Need
}

export default UserDetailsSaga  ;
