import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPages } from "./getPages";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationData({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {getPages(currentPage, totalPages).map((p, idx) =>
          typeof p === "number" ? (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={currentPage === p}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <span key={idx} className="px-2 select-none">
              {p}
            </span>
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}