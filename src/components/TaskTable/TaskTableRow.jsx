/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/ui/table";
import { Circle, CircleCheck, SquarePen } from "lucide-react";
import DeleteAlert from "../deleteAlert";
import { useDispatch } from "react-redux";
import { setCurrentTaskData } from "@/store/features/taskData/taskDataSlice";
import { Badge } from "../ui/badge";
import { setIsCompleted } from "@/store/features/taskList/taskSlice";

const TaskTableRow = ({ task, setIsOpen }) => {
  const { title, priority, status, dueDate, id, isCompleted } = task;
  const dispatch = useDispatch();

  // Open edit modal & store current task data in edit state
  function handleOpen() {
    dispatch(
      setCurrentTaskData({ title, priority, status, dueDate, id, isCompleted })
    );
    setIsOpen(true);
  }

  // update is completed property
  function handleMarkAsComplete(val) {
    dispatch(
      setIsCompleted({ title, priority, status, dueDate, id, isCompleted: val })
    );
  }

  return (
    <>
      <TableRow className="">
        <TableCell className="font-medium">
          <div className="flex items-center gap-1 ">
            {isCompleted ? (
              <CircleCheck
                className="cursor-pointer"
                onClick={() => handleMarkAsComplete(false)}
                size={20}
                strokeWidth={1.5}
              />
            ) : (
              <Circle
                className="cursor-pointer"
                onClick={() => handleMarkAsComplete(true)}
                size={20}
                strokeWidth={1.5}
              />
            )}
            {title}
          </div>
        </TableCell>
        <TableCell>{priority}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{dueDate}</TableCell>
        <TableCell className="flex gap-3 items-center">
          <SquarePen
            size={18}
            strokeWidth={1.8}
            cursor="pointer"
            onClick={handleOpen}
          />
          {/*Delete Alert*/}
          <DeleteAlert
            message={
              "This action cannot be undone. This will permanently delete the task."
            }
            id={id}
          />
        </TableCell>
        <TableCell>{isCompleted && <Badge>Completed</Badge>}</TableCell>
      </TableRow>
    </>
  );
};

export default TaskTableRow;
