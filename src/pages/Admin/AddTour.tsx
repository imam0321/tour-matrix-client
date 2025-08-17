import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/tour/division.api";
import { useAddTourMutation } from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tourType.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function AddTour() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const [addTour] = useAddTourMutation();

  const { data: divisions, isLoading: divisionLoading } = useGetDivisionsQuery({
    limit: 50,
    fields: "_id, name",
  });
  const { data: tourTypes, isLoading: tourTypeLoading } = useGetTourTypesQuery({
    limit: 50,
    fields: "_id, name",
  });

  const divisionOptions = divisions?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypes?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      costFrom: 0,
    },
  });

  const startDate = form.watch("startDate");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      costFrom: Number(data.costFrom)
    };

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

    try {
      const res = await addTour(formData).unwrap();
      toast.success("Tour create successfully")
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-tour"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={divisionLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {divisionOptions?.map(
                            (item: { value: string; label: string }) => (
                              <SelectItem value={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={tourTypeLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tour type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {tourTypeOptions?.map(
                            (item: { value: string; label: string }) => (
                              <SelectItem value={item.value}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover open={startOpen} onOpenChange={setStartOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PP")
                              ) : (
                                <span>Pick a start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              field.onChange(date);
                              setStartOpen(false);
                            }}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover open={endOpen} onOpenChange={setEndOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PP")
                              ) : (
                                <span>Pick a end date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={(date) => {
                              field.onChange(date);
                              setEndOpen(false);
                            }}
                            disabled={(date) =>
                              startDate
                                ? date < new Date(startDate)
                                : date <
                                  new Date(
                                    new Date().setDate(new Date().getDate() - 1)
                                  )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Uploader */}
                <div>
                  <FormItem className="w-full">
                    <FormLabel>Tour Image</FormLabel>
                    <MultipleImageUploader onChange={setImages} />
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
