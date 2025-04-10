// store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectorReducer from "./State/Slices/ContainerSlice";

const store = configureStore({
  reducer: {
    selector: selectorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
