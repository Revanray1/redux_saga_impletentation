import { AppState } from "../../common/appState";

//#region [Auth]
export const selectUserDetails =(state: AppState) => state.userDetails.userAreaDetailsList ;   // userDetails in combined reduced file refer rootReducer
//#region
