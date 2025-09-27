/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDeleteTourMutation,
  useGetToursQuery,
} from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { PenIcon, Trash2 } from "lucide-react";
import ButtonModal from "@/components/modules/Buttons/ButtonModal";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import PaginationData from "@/utils/PaginationData";
import AdminAllToursLoading from "@/components/modules/Admin/Tours/AminAllToursLoading";

export default function AllTours() {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetToursQuery({
    page,
    limit,
    searchTerm: appliedSearch,
  });
  const [deleteTour] = useDeleteTourMutation();

  const tours = data?.data || [];
  const meta = data?.meta;

  useEffect(() => {
    if (searchTerm === "") {
      setAppliedSearch("");
      setPage(1);
    }
  }, [searchTerm]);

  const handleTourDelete = async (id: string) => {
    try {
      await deleteTour(id);
      toast.success("Tour Delete successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <AdminAllToursLoading />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">All Tours</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
              <Input
                placeholder="Search tours"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[200px]"
              />
              <Button
                onClick={() => setAppliedSearch(searchTerm)}
                disabled={!searchTerm.trim()}
                className="w-full sm:w-auto"
              >
                Search
              </Button>
            </div>
            <Button className="md:inline-block hidden" asChild>
              <Link to="/admin/add-tour">Add</Link>
            </Button>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Tour Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours?.length > 0 ? (
                tours?.map((tour) => (
                  <TableRow key={tour._id}>
                    <TableCell>
                      <img
                        src={tour.images[0] || "Tour"}
                        alt="DV"
                        className="w-12 h-12 object-cover rounded border"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {tour.title}
                    </TableCell>
                    <TableCell>{tour.tourType.name}</TableCell>
                    <TableCell>{tour.division.name}</TableCell>
                    <TableCell>{format(tour.startDate, "PP")}</TableCell>
                    <TableCell>{format(tour.endDate, "PP")}</TableCell>
                    <TableCell>{tour.costFrom}</TableCell>
                    <TableCell>
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-muted text-muted-foreground"
                          onClick={() =>
                            navigate("/admin/add-tour", {
                              state: { tourData: tour },
                            })
                          }
                        >
                          <PenIcon />
                        </Button>
                        <ButtonModal
                          actionName={
                            <Button size="sm">
                              <Trash2 />
                            </Button>
                          }
                          title="Delete Tour"
                          description="Are you sure delete this tour?"
                          confirmHandler={handleTourDelete}
                          id={tour._id}
                        ></ButtonModal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No tours found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!isLoading && meta && meta.totalPage > 1 && (
            <PaginationData
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
