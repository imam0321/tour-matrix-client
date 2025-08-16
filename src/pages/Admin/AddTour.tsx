import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// const formSchema = z.object({
//   name: z.string().min(2, "Division name is required"),
//   description: z.string().optional(),
// });

export default function AddTour() {
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      costFrom: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-tour"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Title & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tour title" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Title of the tour (required)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tour location" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Location of the tour (required)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Cost */}
              <FormField
                control={form.control}
                name="costFrom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Starting Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter starting price"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Minimum cost of the tour
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a short description of the tour..."
                          className="min-h-52"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Brief description about the tour
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Uploader */}
                <div className="w-full">
                  <FormItem className="w-full">
                  <FormLabel>Tour Image</FormLabel>
                  <SingleImageUploader
                    onChange={(file) => console.log("Image selected:", file)}
                    preview={null}
                    />
                    </FormItem>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Save Tour
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
