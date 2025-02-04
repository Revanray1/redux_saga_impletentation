import { AppState } from "../../common/appState";

export const getNumberSystem = (state: AppState) =>
  state.commonReducer.numberSystem;

export const getUnitNumberSystem = (state: AppState) =>
  state.commonReducer.unitNumberSystem;

export const selectRowLoader = (state: AppState) =>
  state.commonReducer.loader;