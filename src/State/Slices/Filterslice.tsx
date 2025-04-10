import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filterstate {
  companyId: string;
  userId: string;
  recordPrimaryKey: string;
  operation: string;
}

const initialState: Filterstate = {
  companyId: "",
  userId: "",
  recordPrimaryKey: "",
  operation: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCompanyId: (state, action: PayloadAction<string>) => {
      state.companyId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setRecordPrimaryKey: (state, action: PayloadAction<string>) => {
      state.recordPrimaryKey = action.payload;
    },
    setOperation: (state, action: PayloadAction<string>) => {
      state.operation = action.payload;
    },
  },
});

export const { setCompanyId, setUserId, setRecordPrimaryKey, setOperation } =
  filterSlice.actions;

export default filterSlice.reducer;
