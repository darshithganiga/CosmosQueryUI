// store.ts
import { configureStore } from "@reduxjs/toolkit";

import connectionreducer from "./State/Slices/ConnectionSlice";

const store = configureStore({
  reducer: {
    connection: connectionreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
