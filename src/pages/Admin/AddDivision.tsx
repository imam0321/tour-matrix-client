/* eslint-disable @typescript-eslint/no-explicit-any */
import AllDivision from "@/components/modules/Admin/Division/AllDivision";
import DivisionForm from "@/components/modules/Admin/Division/DivisionForm";
import {
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} from "@/redux/features/tour/division.api";
import type { IDivisionResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDivision() {
  const [editDivision, setEditDivision] = useState<IDivisionResponse | null>(
    null
  );
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetDivisionsQuery({ page, limit });
  const [deleteDivision] = useDeleteDivisionMutation();

  const handleEditDivision = (division: IDivisionResponse) => {
    setEditDivision(division);
    setFormOpen(true);
  };

  const handleDivisionDelete = async (id: string) => {
    try {
      await deleteDivision(id).unwrap();
      toast.success("Division deleted successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Division</h1>
        <DivisionForm
          initialData={editDivision}
          open={formOpen}
          setOpen={setFormOpen}
          onComplete={() => setEditDivision(null)}
        />
      </div>
      <AllDivision
        isLoading={isLoading}
        divisions={data?.data}
        onEditDivision={handleEditDivision}
        onDivisionDelete={handleDivisionDelete}
        page={page}
        setPage={setPage}
        meta={data?.meta}
      />
    </div>
  );
}
