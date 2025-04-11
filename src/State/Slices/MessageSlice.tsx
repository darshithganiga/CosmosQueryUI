import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  messageType: string;
  hasFetched: boolean;
}

const initialState: MessageState = {
  messageType: "",
  hasFetched: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageType: (state, action: PayloadAction<string>) => {
      state.messageType = action.payload;
    },
    setHasFetched: (state, action: PayloadAction<boolean>) => {
      state.hasFetched = action.payload;
    },
  },
});

export const { setMessageType, setHasFetched } = messageSlice.actions;

export default messageSlice.reducer;
