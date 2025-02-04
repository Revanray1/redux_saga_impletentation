import { configureStore, Middleware, Dispatch, AnyAction } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootReducer from "../services/rootReducer";

import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootSaga from "../services/rootSaga";

// const typesToExclude: any = [];

const dev = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

const sagaMiddleware = createSagaMiddleware();
const makeStore = (initialState = {}) => {
  const loggerMiddleware: any = createLogger({
    // predicate: (getState: any, action: any) =>
    //   !typesToExclude.includes(action.type),
  });

  // const middlewares: Middleware<NonNullable<unknown>, any, Dispatch<AnyAction>>[] = [];
  const middlewares: Middleware<any, any, Dispatch<AnyAction>>[] = [];
  if (dev) {
    middlewares.push(loggerMiddleware);
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
          ignoredPaths: ["date", "data.startdate", "data.enddate"],
        },
      })
        .prepend(sagaMiddleware)
        .concat(...middlewares),
  });

  const persist = persistStore(store, undefined, () => sagaMiddleware.run(rootSaga));

  return { persist, store };
};

const appStore = makeStore();

export default appStore;
