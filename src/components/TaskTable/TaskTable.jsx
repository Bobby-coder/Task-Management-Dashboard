import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddTaskDialog from "../AddTaskDialog";
import TaskTableHeader from "./TaskTableHeader";
import TaskTableRow from "./TaskTableRow";
import { useDispatch, useSelector } from "react-redux";
import { updateFilteredItems } from "@/store/features/taskList/taskSlice";
import EditTaskDialog from "../EditTaskDialog";
import NoMatchesFound from "../NoMatchesFound";

const TaskTable = () => {
  const { filteredItems } = useSelector((state) => state.task);
  const { id, title, priority, status, dueDate, isCompleted } = useSelector(
    (state) => state.taskData
  );
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { sortBy, order } = useSelector((state) => state.sorting);

  function handleSearch(e) {
    setSearch(e.target.value);
    dispatch(updateFilteredItems(e.target.value));
  }

  // function to return comparator functions based on different columns
  function comparatorFunction() {
    // Mapping priority column to number so that we can sort numerically order otherwise it will sort alphabetically
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };

    if (sortBy === "title") {
      return order === "asc"
        ? (a, b) => a.title.localeCompare(b.title)
        : (a, b) => b.title.localeCompare(a.title);
    }

    if (sortBy === "priority") {
      return order === "asc"
        ? (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        : (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (sortBy === "status") {
      return order === "asc"
        ? (a, b) => b.status.localeCompare(a.status)
        : (a, b) => a.status.localeCompare(b.status);
    }

    // Converted value into date before sorting otherwise it will sort alphabetically
    if (sortBy === "dueDate") {
      return order === "asc"
        ? (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        : (a, b) => new Date(b.dueDate) - new Date(a.dueDate);
    }
  }

  return (
    <>
      {/*Search input*/}
      <div className="flex justify-between mb-3">
        <Input
          placeholder="Filter tasks..."
          value={search}
          onChange={handleSearch}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/*Add button*/}
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() => setAddOpen(true)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Task
        </Button>
      </div>

      {/* Table */}
      <Table className="border-[1px] rounded-lg border-[#e5e7eb]">
        <TableHeader>
          <TaskTableHeader />
        </TableHeader>
        {/* Table rows */}
        <TableBody>
          {filteredItems.length > 0 ? (
            filteredItems
              .slice()
              .sort(comparatorFunction())
              .map(function (currentTask) {
                return (
                  <TaskTableRow
                    key={currentTask.id}
                    task={currentTask}
                    setIsOpen={setEditOpen}
                  />
                );
              })
          ) : (
            <tr>
              <td colSpan="100%" className="text-center">
                <NoMatchesFound />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      {/* Add task dialoge */}
      {addOpen && <AddTaskDialog setIsOpen={setAddOpen} />}

      {/* Edit task dialoge */}
      {editOpen && (
        <EditTaskDialog
          preFillData={{ id, title, priority, status, dueDate, isCompleted }}
          setIsOpen={setEditOpen}
        />
      )}
    </>
  );
};

export default TaskTable;
