// store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectorReducer from "./State/Slices/ContainerSlice";
import filterreducer from "./State/Slices/Filterslice";

const store = configureStore({
  reducer: {
    selector: selectorReducer,
    filter: filterreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
