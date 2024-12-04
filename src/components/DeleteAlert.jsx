/* eslint-disable react/prop-types */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTask } from "@/store/features/taskList/taskSlice";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DeleteAlert = ({ id, message }) => {
  const dispach = useDispatch();

  // delete function
  async function handleDelete() {
    dispach(deleteTask(id));
    toast.success("Task deleted succesfully")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash size={18} strokeWidth={1.5} cursor="pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
