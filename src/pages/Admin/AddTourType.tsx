import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenIcon, Trash2 } from "lucide-react";
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
import type { ITourTypeResponse } from "@/types";
import { useState } from "react";

export default function AddTourType() {
  const form = useForm();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetTourTypesQuery({ page, limit });
  console.log(data);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold ">Tour Types</h1>
      <div>
        <Form {...form}>
          <form className="flex justify-between items-center mt-4 mb-1 relative">
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
      </div>
      <div className="px-2 border border-muted rounded ">
        <Table>
          <TableHeader className="px-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <div className="flex justify-center py-4">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {!isLoading &&
                  data?.data.map((tourType: ITourTypeResponse) => (
                    <TableRow key={tourType._id}>
                      <TableCell className="font-medium">
                        {tourType?.name}
                      </TableCell>
                      <TableCell className="flex justify-end items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-muted text-muted-foreground"
                        >
                          <PenIcon />
                        </Button>
                        <Button size="sm">
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex justify-center gap-2 my-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span className="flex items-center">
            Page {data?.meta?.page} of {data?.meta?.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data?.meta?.totalPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
