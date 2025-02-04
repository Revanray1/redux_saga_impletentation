import appStore from "./store";

export type AppState = ReturnType<typeof appStore.store.getState>;
