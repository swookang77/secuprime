import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./reducers/vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const vitaminListReducerPersistConfig = {
  key: "vitaminList",
  storage,
};

const persistedVitaminListReducer = persistReducer(vitaminListReducerPersistConfig, vitaminListReducer);

export const store = configureStore({
  reducer: {
    tableData: persistedVitaminListReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);