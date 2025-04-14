import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
  query: string;
  key: string;
  databaseId: string;
  sqlConnectionString: string;
  isConnected: boolean;
}

const initialState: ConnectionState = {
  query: "",
  key: "",
  databaseId: "",
  sqlConnectionString: "",
  isConnected: false,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setDatabaseId: (state, action: PayloadAction<string>) => {
      state.databaseId = action.payload;
    },
    setSqlConnectionString: (state, action: PayloadAction<string>) => {
      state.sqlConnectionString = action.payload;
    },
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  setQuery,
  setKey,
  setDatabaseId,
  setSqlConnectionString,
  setIsConnected,
} = connectionSlice.actions;

export default connectionSlice.reducer;
