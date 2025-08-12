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
import { useAddTourTypeMutation } from "@/redux/features/tour/tourType.api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(2, { error: "Name to short. Minimum 2 character long" })
    .max(50, { error: "Name to long" }),
});

export default function TourTypeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [addTourType] = useAddTourTypeMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await addTourType({ name: data?.name }).unwrap();
      toast.success("Tour type added successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-center mt-4 mb-1 relative"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="absolute end-0">
          Add Tour
        </Button>
      </form>
    </Form>
  );
}
