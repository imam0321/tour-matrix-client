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

interface Tour {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  price: number;
}

export default function AllTours() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const tours: Tour[] = [
    {
      id: "1",
      name: "Everest Adventure",
      type: "Trekking",
      startDate: "2025-09-01",
      endDate: "2025-09-10",
      price: 1200,
    },
    {
      id: "2",
      name: "Sundarbans Cruise",
      type: "Cruise",
      startDate: "2025-10-05",
      endDate: "2025-10-08",
      price: 800,
    },
    {
      id: "3",
      name: "Cox’s Bazar Retreat",
      type: "Beach",
      startDate: "2025-11-12",
      endDate: "2025-11-15",
      price: 500,
    },
  ];

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || tour.type === typeFilter)
  );

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Tour Matrix</CardTitle>
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
                <TableHead>Tour Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Price ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>{tour.name}</TableCell>
                    <TableCell>{tour.type}</TableCell>
                    <TableCell>{tour.startDate}</TableCell>
                    <TableCell>{tour.endDate}</TableCell>
                    <TableCell>{tour.price}</TableCell>
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
