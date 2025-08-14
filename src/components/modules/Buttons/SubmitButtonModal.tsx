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
import type React from "react";

interface ISubmitButtonModal {
  actionName: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmButtonTitle: string;
}

export default function SubmitButtonModal({
  actionName,
  title,
  description,
  onConfirm,
  confirmButtonTitle,
}: ISubmitButtonModal) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{actionName}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm()}>
            {confirmButtonTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
