/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteTourMutation,
  useGetToursQuery,
} from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { PenIcon, Trash2 } from "lucide-react";
import ButtonModal from "@/components/modules/Buttons/ButtonModal";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function AllTours() {
  const [search, setSearch] = useState("");
  const [, setTypeFilter] = useState("");
  const navigate = useNavigate();

  const { data } = useGetToursQuery(undefined);
  const [deleteTour] = useDeleteTourMutation();

  const tours = data?.data || [];

  const handleTourDelete = async (id: string) => {
    try {
      await deleteTour(id);
      toast.success("Tour Delete successfully");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>All Tours</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Input
              placeholder="Search tours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Trekking">Trekking</SelectItem>
                <SelectItem value="Cruise">Cruise</SelectItem>
                <SelectItem value="Beach">Beach</SelectItem>
              </SelectContent>
            </Select>
            <Button>Add New Tour</Button>
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
                    <TableCell>{tour.title}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
