import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  theme: "light" | "dark";
  searchQuery: string;
};

const initialState: UIState = {
  theme: "light",
  searchQuery: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleTheme, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;