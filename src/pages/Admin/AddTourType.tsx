/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tourType.api";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { ITourTypeResponse } from "@/types";
import { useState } from "react";
import TourTypeForm from "@/components/modules/Tours/TourTypes/TourTypeForm";
import { toast } from "sonner";
import AllTourTypes from "@/components/modules/Tours/TourTypes/AllTourTypes";

export default function AddTourType() {
  const [editTourType, setEditTourType] = useState<ITourTypeResponse | null>(
    null
  );
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetTourTypesQuery({ page, limit });
  const [deleteTourType] = useDeleteTourTypeMutation();

  const handleTourTypeDelete = async (id: string) => {
    try {
      await deleteTourType(id);
      toast.success("Tour Type Delete successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full max-w-3xl h-screen mx-auto">
      <h1 className="text-2xl font-bold ">Tour Types</h1>
      <div>
        <TourTypeForm
          initialData={editTourType}
          onComplete={() => setEditTourType(null)}
        />
      </div>
      <div className="px-2 border border-muted rounded ">
        <Table>
          <TableHeader className="px-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <AllTourTypes
            isLoading={isLoading}
            tourTypes={data?.data}
            onEditTourType={setEditTourType}
            onTourTypeDelete={handleTourTypeDelete}
          />
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
