import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Division from "./Division";
import { Button } from "@/components/ui/button";
import type { IDivisionResponse } from "@/types";

interface IAllDivisionProps {
  isLoading: boolean;
  divisions?: IDivisionResponse[];
  onEditDivision: (division: IDivisionResponse) => void;
  onDivisionDelete: (id: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta?: { page: number; totalPage: number };
}

export default function AllDivision({
  isLoading,
  divisions,
  onEditDivision,
  onDivisionDelete,
  page,
  setPage,
  meta,
}: IAllDivisionProps) {
  return (
    <div className="px-2 border border-muted rounded mt-4">
      <Table>
        <TableHeader className="px-10">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Division
          isLoading={isLoading}
          divisions={divisions}
          onEditDivision={onEditDivision}
          onDivisionDelete={onDivisionDelete}
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
          Page {meta?.page} of {meta?.totalPage}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === meta?.totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
