/* eslint-disable react/prop-types */
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { useState } from "react";
import { setDueDate } from "@/store/features/taskData/taskDataSlice";
import { useDispatch, useSelector } from "react-redux";

const CalendarInput = ({ defaultvalue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dueDate } = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  const closePopover = () => {
    setIsOpen(false);
  };

  function handleDateChange(val) {
    dispatch(setDueDate(val));
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{dueDate ? dueDate : "Select Date"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Calendar
          name="dueDate"
          mode="single"
          onSelect={(val) => {
            handleDateChange(val.toLocaleDateString());
            closePopover();
          }}
          selected={defaultvalue ? new Date(defaultvalue) : new Date(dueDate)}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarInput;
