import { call, put, select, takeLeading } from "redux-saga/effects";
import { errorNotification, successNotification } from "../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../login/selectors";
import { DownloadRowDataRequestAction, DownloadRowDataSucceededAction, downloadRowDataSucceeded } from "./action";
import { downloadRowDataAPI } from "./api";
import { FileResponse } from "./dataTypes";
import * as actionTypes from "./types";
import { FAILED_TO_CONNECT_NETWORK, networkErrorCode } from "../../../utils/constants";

// Download row-data
function* handleDownloadRowData(action: DownloadRowDataRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const response: FileResponse | null | undefined= yield call(downloadRowDataAPI, accessToken, action.containerName, action.filePath, action.fileName);
    if (!response?.fileName) {
      throw new Error("API Failed...");
    } else if (response) {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadRowDataSucceededAction = yield call(downloadRowDataSucceeded);
      yield put(next);
    }
  } catch (error: any) {
    if (error !== 401) yield call(errorNotification, networkErrorCode.includes(error) ? FAILED_TO_CONNECT_NETWORK : "Download Failed...");
    yield put({
      type: actionTypes.DOWNLOAD_ROW_DATA_FAILED,
      message: "",
    });
  }
}

function* downloadRowDataSaga() {
  yield takeLeading(actionTypes.DOWNLOAD_ROW_DATA_REQUESTED, handleDownloadRowData);
}

export default downloadRowDataSaga;
