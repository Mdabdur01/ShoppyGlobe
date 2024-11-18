import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  query: "",
};

// Search Slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload; // Update query state
    },
  },
});

// Export Actions
export const { setSearchQuery } = searchSlice.actions;

// Export Reducer
export default searchSlice.reducer;
