import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { toast } from "sonner";
import SingleImageUploader from "@/components/SingleImageUploader";

const formSchema = z.object({
  name: z.string().min(2, "Name is required and must be at least 2 characters"),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function DivisionForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      description: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    toast.success(`Division added: ${data.name}`);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
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
            <SingleImageUploader />

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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
