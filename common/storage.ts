// import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import secureLocalStorage from "react-secure-storage";
import * as storages from "redux-persist/lib/storage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      console.log(_key);
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      console.log(_key);
      return Promise.resolve(value);
    },
    removeItem(_key) {
      console.log(_key);
      return Promise.resolve();
    },
  };
};

const createLocalStorage = () => {
  return {
    getItem(_key) {
      const value = secureLocalStorage.getItem(_key);
      return Promise.resolve(value);
    },
    setItem(_key, value) {
      secureLocalStorage.setItem(_key, value);
      return Promise.resolve(value);
    },
    removeItem(_key) {
      secureLocalStorage.removeItem(_key);
      return Promise.resolve();
    },
  };
};

//createWebStorage('local')
const storageData = typeof window !== "undefined" ? createLocalStorage() : createNoopStorage();

const storage = storages.default;

// export default storage;
export default storageData;
