import { TableHead, TableRow } from "@/components/ui/table";
import { setSorting } from "@/store/features/sorting/sortingSlice";
import { MoveDown, MoveUp } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TaskTableHeader = () => {
  const dispatch = useDispatch();
  const [orderToggle, setOrderToggle] = useState({
    titleAsc: true,
    priorityAsc: true,
    statusAsc: true,
    dueDateAsc: true,
  });
  const [activeColumn, setActiveColumn] = useState(null);

  // handler to toggle the order and store the sorting column & order in global store
  function handleSort(column) {
    // first set active column, then toggle the order, then update the order state & sorting column in global store
    if (column === "title") {
      setActiveColumn("title");
      setOrderToggle({ ...orderToggle, titleAsc: !orderToggle.titleAsc });
      dispatch(
        setSorting(`${column}_${orderToggle["titleAsc"] ? "asc" : "desc"}`)
      );
    }
    if (column === "priority") {
      setActiveColumn("priority");
      setOrderToggle({ ...orderToggle, priorityAsc: !orderToggle.priorityAsc });
      dispatch(
        setSorting(`${column}_${orderToggle["priorityAsc"] ? "asc" : "desc"}`)
      );
    }
    if (column === "status") {
      setActiveColumn("status");
      setOrderToggle({ ...orderToggle, statusAsc: !orderToggle.statusAsc });
      dispatch(
        setSorting(`${column}_${orderToggle["statusAsc"] ? "asc" : "desc"}`)
      );
    }
    if (column === "dueDate") {
      setActiveColumn("dueDate");
      setOrderToggle({ ...orderToggle, dueDateAsc: !orderToggle.dueDateAsc });
      dispatch(
        setSorting(`${column}_${orderToggle["dueDateAsc"] ? "asc" : "desc"}`)
      );
    }
  }

  return (
    <TableRow>
      <TableHead onClick={() => handleSort("title")}>
        <div className="flex items-center">
          Title
          {activeColumn === "title" ? (
            orderToggle.titleAsc ? (
              <MoveDown size={16} strokeWidth={1.5} />
            ) : (
              <MoveUp size={16} strokeWidth={1.5} />
            )
          ) : null}
        </div>
      </TableHead>
      <TableHead onClick={() => handleSort("priority")}>
        <div className="flex items-center">
          Priority
          {activeColumn === "priority" ? (
            orderToggle.priorityAsc ? (
              <MoveDown size={16} strokeWidth={1.5} />
            ) : (
              <MoveUp size={16} strokeWidth={1.5} />
            )
          ) : null}
        </div>
      </TableHead>
      <TableHead onClick={() => handleSort("status")}>
        <div className="flex items-center">
          Status
          {activeColumn === "status" ? (
            orderToggle.statusAsc ? (
              <MoveDown size={16} strokeWidth={1.5} />
            ) : (
              <MoveUp size={16} strokeWidth={1.5} />
            )
          ) : null}
        </div>
      </TableHead>
      <TableHead onClick={() => handleSort("dueDate")}>
        <div className="flex items-center">
          Due Date
          {activeColumn === "dueDate" ? (
            orderToggle.dueDateAsc ? (
              <MoveDown size={16} strokeWidth={1.5} />
            ) : (
              <MoveUp size={16} strokeWidth={1.5} />
            )
          ) : null}
        </div>
      </TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  );
};

export default TaskTableHeader;
