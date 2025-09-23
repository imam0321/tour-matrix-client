/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddTourTypeMutation,
  useUpdateTourTypeMutation,
} from "@/redux/features/tour/tourType.api";
import { toast } from "sonner";
import type { ITourTypeResponse } from "@/types";
import { useEffect } from "react";
import SubmitButtonModal from "../../Buttons/SubmitButtonModal";

interface TourTypeFormProps {
  initialData: ITourTypeResponse | null;
  onComplete?: () => void;
}

const formSchema = z.object({
  name: z.string({ error: "Name must be string" }),
});

export default function TourTypeForm({
  initialData,
  onComplete,
}: TourTypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [addTourType] = useAddTourTypeMutation();
  const [updateTourType] = useUpdateTourTypeMutation();

  useEffect(() => {
    form.reset(initialData ? { name: initialData.name } : { name: "" });
  }, [initialData, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await updateTourType({
          id: initialData?._id,
          name: data?.name,
        }).unwrap();
        toast.success("Tour type updated successfully");
      } else {
        await addTourType({ name: data?.name }).unwrap();
        toast.success("Tour type added successfully");
      }

      form.reset();
      onComplete?.();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-center mb-4 relative"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter a tour type name"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your tour type Name
              </FormDescription>
              <FormMessage className="absolute text-red-600 top-full left-0 mt-1" />
            </FormItem>
          )}
        />
        <SubmitButtonModal
          actionName={
            <Button className="absolute end-0">
              {initialData ? "Update Tour Type" : "Add Tour Type"}
            </Button>
          }
          title={initialData ? "Update Tour Type" : "Add Tour Type"}
          description={
            initialData
              ? `Are you sure Update "${form.watch("name")}" this tour type?`
              : `Are you sure Add "${form.watch("name")}" this tour type?`
          }
          onConfirm={handleConfirm}
          confirmButtonTitle={
            initialData ? "Update Tour Type" : "Add Tour Type"
          }
        />
      </form>
    </Form>
  );
}
