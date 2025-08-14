/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useEffect, useState } from "react";
import {
  useAddDivisionMutation,
  useUpdateDivisionMutation,
} from "@/redux/features/tour/division.api";
import { toast } from "sonner";
import type { IDivisionResponse } from "@/types";

interface IDivisionProps {
  initialData: IDivisionResponse | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onComplete: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Division name is required"),
  description: z.string().optional(),
});

export default function DivisionForm({
  initialData,
  open,
  setOpen,
  onComplete,
}: IDivisionProps) {
  const [image, setImage] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [addDivision] = useAddDivisionMutation();
  const [updateDivision] = useUpdateDivisionMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
      });
      if (initialData.thumbnail) {
        setPreviewImage(initialData.thumbnail || null);
      }
    } else {
      form.reset({ name: "", description: "" });
      setPreviewImage(null);
    }
    setImage(null);
  }, [form, initialData]);

  const handleAddDivision = () => {
    onComplete();
    setOpen(true);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading(
      initialData ? "Updating division..." : "Uploading division..."
    );
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (image) formData.append("file", image);

    try {
      if (initialData) {
        await updateDivision({ id: initialData._id, formData }).unwrap();
        toast.success("Division updated successfully", { id: toastId });
      } else {
        await addDivision(formData).unwrap();
        toast.success("Division uploaded successfully", { id: toastId });
      }

      setOpen(false);
      onComplete();
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleAddDivision}>Add Division</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Division" : "Add Division"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the details for this division."
              : "Fill out the form below to add a new division."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mx-auto my-4 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Division name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Name of the division (required)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* thumbnail */}
            <SingleImageUploader
              onChange={setImage}
              preview={initialData?.thumbnail || null}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Brief description about the division
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-division">
            {initialData ? "Update" : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
