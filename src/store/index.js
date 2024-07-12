import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "./slice/themeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

const store = configureStore({
  reducer: {
    theme: persistedReducer,
  },
});

let persistor = persistStore(store);

export { store, persistor };
