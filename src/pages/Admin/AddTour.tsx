/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  useAddTourMutation,
  useUpdateTourMutation,
} from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tourType.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";

export default function AddTour() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);

  const location = useLocation();
  const editTourData = location.state?.tourData;
  const isEditing = Boolean(editTourData?._id);

  const [addTour] = useAddTourMutation();
  const [updateTour] = useUpdateTourMutation();

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
      title: editTourData?.title || "",
      division: editTourData?.division?._id || "",
      tourType: editTourData?.tourType?._id || "",
      minAge: editTourData?.minAge || 0,
      maxGuest: editTourData?.maxGuest || 0,
      startDate: editTourData?.startDate || "",
      endDate: editTourData?.endDate || "",
      location: editTourData?.location || "",
      description: editTourData?.description || "",
      costFrom: editTourData?.costFrom || 0,
      included: editTourData?.included?.map((i: string) => ({ value: i })) || [
        { value: "" },
      ],
      excluded: editTourData?.excluded?.map((i: string) => ({ value: i })) || [
        { value: "" },
      ],
      amenities: editTourData?.amenities?.map((i: string) => ({
        value: i,
      })) || [{ value: "" }],
      tourPlan: editTourData?.tourPlan?.map((i: string) => ({ value: i })) || [
        { value: "" },
      ],
    },
  });

  useEffect(() => {
    if (editTourData?.images?.length) {
      setImages(editTourData.images); // store old image URLs in `images`
    }
  }, [editTourData]);

  const {
    fields: includedFields,
    append: includedAppend,
    remove: includedRemove,
  } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: tourPlanFields,
    append: tourPlanAppend,
    remove: tourPlanRemove,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

  const startDate = form.watch("startDate");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      costFrom: Number(data.costFrom),
      minAge: Number(data.minAge),
      maxGuest: Number(data.maxGuest),
      included: data.included.map((item: { value: string }) => item.value),
      excluded: data.excluded.map((item: { value: string }) => item.value),
      amenities: data.amenities.map((item: { value: string }) => item.value),
      tourPlan: data.tourPlan.map((item: { value: string }) => item.value),
      images: oldImages,
    };

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));
    const toastId = toast.loading(
      isEditing ? "Updating tour..." : "Creating tour..."
    );
    try {
      if (isEditing) {
        await updateTour({ id: editTourData?._id, formData }).unwrap();
        toast.success("Tour updated successfully", { id: toastId });
      } else {
        await addTour(formData).unwrap();
        toast.success("Tour created successfully", { id: toastId });
      }
      setLoading(false);
      form.reset();
      setImages([]);
      setOldImages([]);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditing ? "Edit Tour" : "Add New Tour"}
          </CardTitle>
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
                  rules={{ required: "Tour Title is required" }}
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
                  rules={{ required: "Location is required" }}
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
              {/* Division & TourTypes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="division"
                  rules={{ required: "Please select a division" }}
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
                              <SelectItem key={item.value} value={item.value}>
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
                  rules={{ required: "Please select a tour type" }}
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
                              <SelectItem key={item.value} value={item.value}>
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
              {/* Cost & Max Gest & Min Age */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="costFrom"
                  rules={{
                    required: "Cost is required",
                    min: { value: 0, message: "Cost cannot be negative" },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cost</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter tour cost"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minAge"
                  rules={{
                    required: "Minimum age is required",
                    min: { value: 0, message: "Age cannot be negative" },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Minimum Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter minimum Age"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxGuest"
                  rules={{
                    required: "Maximum guests is required",
                    min: { value: 1, message: "Must be at least 1" },
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Max Gest</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter max gest"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  rules={{ required: "Start date is required" }}
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
                  rules={{ required: "End date is required" }}
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
                    <MultipleImageUploader
                      preview={images}
                      onChange={setImages}
                    />
                  </FormItem>
                </div>
              </div>

              <div className="border border-gray-800" />
              {/* included, excluded amenities, Tour Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Included Section */}
                <div className="p-2 rounded-2xl border shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">✅ Included</h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => includedAppend({ value: "" })}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {includedFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg p-1"
                      >
                        <FormField
                          control={form.control}
                          name={`included.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter included item"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => includedRemove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excluded Section */}
                <div className="p-2 rounded-2xl border shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">❌ Excluded</h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => excludedAppend({ value: "" })}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {excludedFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg p-1"
                      >
                        <FormField
                          control={form.control}
                          name={`excluded.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter excluded item"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => excludedRemove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Amenities Section */}
                <div className="p-2 rounded-2xl border shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">✅ Amenities</h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => amenitiesAppend({ value: "" })}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {amenitiesFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg p-1"
                      >
                        <FormField
                          control={form.control}
                          name={`amenities.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter amenities item"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => amenitiesRemove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tour Plan Section */}
                <div className="p-2 rounded-2xl border shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg">📝 Tour Plan</h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => tourPlanAppend({ value: "" })}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {tourPlanFields.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg p-1"
                      >
                        <FormField
                          control={form.control}
                          name={`tourPlan.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter tour Plan item"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => tourPlanRemove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                {loading
                  ? isEditing
                    ? "Updating..."
                    : "Uploading..."
                  : isEditing
                  ? "Update Tour"
                  : "Upload Tour"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
