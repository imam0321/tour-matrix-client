import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Division from "./Division";
import type { IDivisionResponse } from "@/types";
import PaginationData from "@/utils/PaginationData";

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
    <div>
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
      <div className="pb-2 mt-0">
        <PaginationData
          currentPage={page}
          totalPages={meta?.totalPage as number}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
