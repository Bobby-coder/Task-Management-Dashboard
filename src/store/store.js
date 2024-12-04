import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/taskList/taskSlice";
import taskDataReducer from "./features/taskData/taskDataSlice";
import sortReducer from "./features/sorting/sortingSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    taskData: taskDataReducer,
    sorting: sortReducer,
  },
});
