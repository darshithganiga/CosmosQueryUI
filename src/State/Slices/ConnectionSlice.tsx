import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
  query: string;
  key: string;
  databaseId: string;
  containername: string;
  sqlConnectionString: string;
  sqldatabasename: string;
  sqltableName: string;
  isConnected: boolean;
}

const initialState: ConnectionState = {
  query: "",
  key: "",
  databaseId: "",
  containername: "",
  sqlConnectionString: "",
  sqldatabasename: "",
  sqltableName: "",
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
    setContainerName: (state, action: PayloadAction<string>) => {
      state.containername = action.payload;
    },

    setSqlConnectionString: (state, action: PayloadAction<string>) => {
      state.sqlConnectionString = action.payload;
    },
    setSqlDatabaseName: (state, action: PayloadAction<string>) => {
      state.sqldatabasename = action.payload;
    },
    setSqltableName: (state, action: PayloadAction<string>) => {
      state.sqltableName = action.payload;
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
  setContainerName,
  setSqlConnectionString,
  setSqlDatabaseName,
  setSqltableName,
  setIsConnected,
} = connectionSlice.actions;

export default connectionSlice.reducer;
