/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tourType.api";
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
import type { ITourTypeResponse } from "@/types";
import { useState } from "react";
import TourTypeForm from "@/components/modules/Tours/TourTypeForm";
import { toast } from "sonner";
import ButtonModal from "@/components/modules/Tours/ButtonModal";

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
    <div className="w-full max-w-3xl mx-auto">
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
                          onClick={() => setEditTourType(tourType)}
                          className="bg-muted text-muted-foreground"
                        >
                          <PenIcon />
                        </Button>
                        <ButtonModal
                          actionName={
                            <Button size="sm">
                              <Trash2 />
                            </Button>
                          }
                          title="Delete Tour Type"
                          description="Are you sure delete this tour type?"
                          confirmHandler={handleTourTypeDelete}
                          id={tourType._id}
                        ></ButtonModal>
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
