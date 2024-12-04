import { Search } from "lucide-react";

const NoMatchesFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6 text-center">
      <Search className="text-gray-500 mb-4" size={48} strokeWidth={1.5} />
      <h2 className="text-gray-600 text-lg font-semibold">No Matches Found</h2>
      <p className="text-gray-500 mt-2">
        Try adjusting your search or clearing the filter to see all tasks.
      </p>
    </div>
  );
};

export default NoMatchesFound;
