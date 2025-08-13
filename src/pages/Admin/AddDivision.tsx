import AllDivision from "@/components/modules/Admin/Division/AllDivision";
import DivisionForm from "@/components/modules/Admin/Division/DivisionForm";
import { useGetDivisionsQuery } from "@/redux/features/tour/division.api";
import type { IDivisionResponse } from "@/types";
import { useState } from "react";

export default function AddDivision() {
  const [editDivision, setEditDivision] = useState<IDivisionResponse | null>(
    null
  );
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetDivisionsQuery({ page, limit });
  console.log(data);

  const handleDivisionDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Division</h1>
        <DivisionForm />
      </div>
      <AllDivision
        isLoading={isLoading}
        divisions={data?.data}
        onEditDivision={setEditDivision}
        onDivisionDelete={handleDivisionDelete}
        page={page}
        setPage={setPage}
        meta={data?.meta}
      />
    </div>
  );
}
