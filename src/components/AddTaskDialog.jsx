/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Dropdown from "./Dropdown";
import CalendarInput from "./CalendarInput";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/store/features/taskList/taskSlice";
import {
  clearTaskData,
  setTitle,
} from "@/store/features/taskData/taskDataSlice";

const AddTaskDialog = ({ setIsOpen }) => {
  const { title, priority, status, dueDate } = useSelector(
    (state) => state.taskData
  );
  const dispatch = useDispatch();

  // handler to close dialog
  function handleClose() {
    dispatch(clearTaskData());
    setIsOpen(false);
  }

  // handler to update title
  function handleTitle(e) {
    dispatch(setTitle(e.target.value));
  }

  // handler to add task
  function handleSubmit(e) {
    e.preventDefault();
    if (title && priority !== "Priority" && status !== "Status" && dueDate) {
      dispatch(addTask({ title, priority, status, dueDate }));
      setIsOpen(false);
      dispatch(clearTaskData());
      toast.success("Task added successfully");
    } else {
      toast.error("All fields are required");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[300px] absolute top-[50%] left-[50%] p-4 translate-x-[-50%] translate-y-[-50%] z-10 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white text-slate-950 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#cccc]"
    >
      {/*Title input*/}
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Enter title..."
          onChange={handleTitle}
          value={title}
        />
      </div>

      {/*Priority dropdown*/}
      <Dropdown values={["Low", "Medium", "High"]} label={"Priority"} />

      {/*Status dropdown*/}
      <Dropdown values={["Todo", "In Progress", "Done"]} label={"Status"} />

      {/*Due date*/}
      <CalendarInput label={"Due Date"} />

      {/*Add Button*/}
      <Button type="submit">Add</Button>

      {/*Close Button*/}
      <div className="absolute top-[-5px] right-[-5px] z-30">
        <button
          className="flex items-center justify-center h-8 w-8 bg-red-600 text-white rounded-full border border-red-500 hover:bg-red-700
    focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150 ease-in-out shadow-md"
          onClick={handleClose}
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
};

export default AddTaskDialog;
