import { Database } from "lucide-react";

const NoDataAvailable = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6 text-center">
      <Database className="text-gray-500 mb-4" size={48} strokeWidth={1.5} />
      <h2 className="text-gray-600 text-lg font-semibold">No Data Available</h2>
      <p className="text-gray-500 mt-2">Add tasks to see chart data.</p>
    </div>
  );
};

export default NoDataAvailable;
