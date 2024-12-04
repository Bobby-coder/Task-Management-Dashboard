import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: "", // Any column name e.g., 'title', 'priority', 'status', 'due date'.
  order: "", // 'asc' or 'desc'
};

export const sortSlice = createSlice({
  name: "sorting",
  initialState: initialState,
  reducers: {
    setSorting(state, action) {
      const [sortBy, order] = action.payload.split("_");
      state.sortBy = sortBy;
      state.order = order;
    },
  },
});

export const { setSorting } = sortSlice.actions;

export default sortSlice.reducer;
