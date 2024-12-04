/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Dropdown from "./Dropdown";
import CalendarInput from "./CalendarInput";
import { useDispatch } from "react-redux";
import { updateTask } from "@/store/features/taskList/taskSlice";
import {
  clearTaskData,
  setTitle,
} from "@/store/features/taskData/taskDataSlice";

const EditTaskDialog = ({ setIsOpen, preFillData }) => {
  const { title, priority, status, dueDate, id, isCompleted } = preFillData;
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
    if (
      title.trim() &&
      priority !== "Priority" &&
      status !== "Status" &&
      dueDate
    ) {
      dispatch(
        updateTask({ id, title, priority, status, dueDate, isCompleted })
      );
      dispatch(clearTaskData());
      setIsOpen(false);
      toast.success("Task updated successfully");
    } else {
      toast.error("All fields are required");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[300px] absolute top-[50%] left-[50%] p-4 translate-x-[-50%] z-10 translate-y-[-50%] flex flex-col gap-3 rounded-lg border border-slate-200 bg-white text-slate-950 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#cccc]"
    >
      {/*Title input*/}
      <div>
        <Label>Title</Label>
        <Input name="title" type="text" onChange={handleTitle} value={title} />
      </div>

      {/*Priority dropdown*/}
      <Dropdown
        values={["Low", "Medium", "High"]}
        label={"Priority"}
        defaultvalue={priority}
      />

      {/*Status dropdown*/}
      <Dropdown
        values={["Todo", "In Progress", "Done"]}
        label={"Status"}
        defaultvalue={status}
      />

      {/*Due date*/}
      <CalendarInput label={"Due Date"} defaultvalue={dueDate} />

      {/*Update Button*/}
      <Button type="submit">Update</Button>

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

export default EditTaskDialog;
