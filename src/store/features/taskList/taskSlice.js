import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("tasks")) || [],
  filteredItems: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        id: crypto.randomUUID(),
        ...action.payload,
        isCompleted: action.payload.status === "Done" ? true : false,
      });

      // update filtered items list whenever items list changes
      state.filteredItems = state.items;

      // update localStorage whenever items list changes
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    updateTask: (state, action) => {
      state.items = state.items.map((currItem) => {
        if (currItem.id === action.payload.id)
          return {
            ...action.payload,
            isCompleted: action.payload.status === "Done" ? true : false,
          };
        return currItem;
      });

      // update filtered items list whenever items list changes
      state.filteredItems = state.items;

      // update localStorage whenever items list changes
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    updateFilteredItems: (state, action) => {
      if (action.payload === "") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(({ title }) => {
          return title.toLowerCase().includes(action.payload.toLowerCase());
        });
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);

      // update filtered items list whenever items list changes
      state.filteredItems = state.items;

      // update localStorage whenever items list changes
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    setIsCompleted: (state, action) => {
      state.items = state.items.map((currItem) => {
        if (currItem.id === action.payload.id)
          return {
            ...action.payload,
            isCompleted: action.payload.isCompleted,
            status: action.payload.isCompleted ? "Done" : "Todo",
          };
        return currItem;
      });

      // update filtered items list whenever items list changes
      state.filteredItems = state.items;

      // update localStorage whenever items list changes
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

export const {
  addTask,
  updateFilteredItems,
  deleteTask,
  updateTask,
  setIsCompleted,
} = taskSlice.actions;
export default taskSlice.reducer;
