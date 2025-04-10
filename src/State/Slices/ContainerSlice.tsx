import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectorState {
  container: string;
  table: string;
  message: string;
  loading: boolean;
}

const initialState: SelectorState = {
  container: "",
  table: "",
  message: "",
  loading: false,
};

const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    setContainer: (state, action: PayloadAction<string>) => {
      state.container = action.payload;
      state.table = "";
      state.message = "";
    },
    setTable: (state, action: PayloadAction<string>) => {
      state.table = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setContainer, setTable, setMessage, setLoading } =
  selectorSlice.actions;

export default selectorSlice.reducer;
