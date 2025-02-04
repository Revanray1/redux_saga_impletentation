import { all, fork } from "redux-saga/effects";
import hdfcAuthSaga from "./login/saga";
import externalNOCSaga from "./external-noc/saga";
import projectSaga from "./project/saga";
import manageRequestSaga from "./manage-request/saga";
import downloadRowDataSaga from "./service/common/saga";  // refer for all as needed
import manageDocsUpdateSaga from "./manage-docs/saga";

export default function* rootSaga() {
  yield all([fork(hdfcAuthSaga), fork(projectSaga), fork(externalNOCSaga), fork(manageRequestSaga), fork(downloadRowDataSaga), fork(manageDocsUpdateSaga)]);
}
