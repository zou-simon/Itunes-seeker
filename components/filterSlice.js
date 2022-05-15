import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "Tous",
  reducers: {
    setFilter: (state, action) => {
      return action.payload; // Tous, 0, 1, 2, 3, 4, 5 (Note)
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterSelector = (state) => state.filter;
export default filterSlice.reducer;
