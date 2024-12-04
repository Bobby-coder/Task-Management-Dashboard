/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriority,
  setStatus,
} from "@/store/features/taskData/taskDataSlice";

const Dropdown = ({ values, label, defaultvalue }) => {
  const { priority, status } = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (label === "Priority") {
      dispatch(setPriority(event.target.value));
    } else {
      dispatch(setStatus(event.target.value));
    }
  };

  return (
    <div className="relative w-full">
      {/* Label */}
      <Label
        htmlFor="styled-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </Label>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          id="styled-select"
          value={
            defaultvalue
              ? defaultvalue
              : label === "Priority"
              ? priority
              : status
          }
          onChange={handleChange}
          className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm font-medium 
          text-gray-800 shadow-sm hover:bg-gray-50 transition-all"
        >
          <option disabled value={label} className="text-gray-400">
            {label}
          </option>
          {values.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Icon */}
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
