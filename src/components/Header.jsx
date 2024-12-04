import { Calendar, CheckCircle, Clipboard } from "lucide-react";
import { useSelector } from "react-redux";

export const Header = () => {
  const { items } = useSelector((state) => state.task);

  // get count of all pending todos
  const pendingTasks = items.reduce((acc, currTask) => {
    return acc + (currTask.isCompleted ? 0 : 1);
  }, 0);

  // get count of all completed todos
  const completedTasks = items.reduce((acc, currTask) => {
    return acc + (currTask.isCompleted ? 1 : 0);
  }, 0);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-6 px-4 sm:px-8 mb-8 border border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Task Management Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center sm:justify-end w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            <p className="text-sm sm:text-lg">Total: {items.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} />
            <p className="text-sm sm:text-lg">Completed: {completedTasks}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clipboard size={20} />
            <p className="text-sm sm:text-lg">Pending: {pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
