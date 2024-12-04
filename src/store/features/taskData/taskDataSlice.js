import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  title: "",
  priority: "Priority",
  status: "Status",
  dueDate: "",
  isCompleted: false,
};

export const taskDataSlice = createSlice({
  name: "taskData",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    clearTaskData: (state) => {
      state.id = "";
      state.title = "";
      state.priority = "Priority";
      state.status = "Status";
      state.dueDate = "";
      state.isCompleted = false;
    },
    setCurrentTaskData: (state, action) => {
      state.title = action.payload.title;
      state.priority = action.payload.priority;
      state.status = action.payload.status;
      state.dueDate = action.payload.dueDate;
      state.id = action.payload.id;
      state.isCompleted = action.payload.isCompleted;
    },
  },
});

export const {
  setTitle,
  setPriority,
  setStatus,
  setDueDate,
  clearTaskData,
  setCurrentTaskData,
} = taskDataSlice.actions;
export default taskDataSlice.reducer;
