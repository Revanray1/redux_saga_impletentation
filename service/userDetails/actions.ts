import { 
  SampleUserDataTypesResponse 
} from "./dataTypes";
import * as actionTypes from "./types";




//#region [Request]

export type FetchSampleUserDataRequestedType = {
  type: typeof actionTypes.GET_USER_DATA_REQUESTED;
  userId: number, // parameters we are passing in thi sonly id passing
  callback?: (success: boolean, message?: string) => void;
};

export const FetchSampleUserDataRequested = (
  userId: number,
  callback?: (success: boolean, message?: string) => void,
): FetchSampleUserDataRequestedType => ({
  type: actionTypes.GET_USER_DATA_REQUESTED,
  userId,
  callback,
});
//#endregion [Requested]

//#region [Succeed Action]
export type FetchSampleUserDataSucceededType = {
  type: typeof actionTypes.GET_USER_DATA_SUCCEEDED;
  result: SampleUserDataTypesResponse;
};

export const getNOCAccountSucceeded = (result: SampleUserDataTypesResponse): FetchSampleUserDataSucceededType => ({
  type: actionTypes.GET_USER_DATA_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type FetchSampleUserDataFailedType = {
  type: typeof actionTypes.GET_USER_DATA_FAILED;
  error?: string;
};

export const FetchSampleUserDataSucceeded = (error?: string): FetchSampleUserDataFailedType => ({
  type: actionTypes.GET_USER_DATA_FAILED,
  error,
});
//#endregion [Failed]


//#region [get user Reset Action]
export type FetchSampleUserDataResetType = {
  type: typeof actionTypes.GET_USER_DATA_RESET;
  error?: string;
};

export const FetchSampleUserDataReset = (error?: string): FetchSampleUserDataResetType => ({
  type: actionTypes.GET_USER_DATA_RESET,
  error,
});
//#endregion [Reset]

//  You can add more actions like update or delete UserData

export type UserDetailsActions =
  // Fetch user data
  | FetchSampleUserDataRequestedType
  | FetchSampleUserDataSucceededType
  | FetchSampleUserDataFailedType
  | FetchSampleUserDataResetType

