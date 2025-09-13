import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/tour/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tourType.api";
import { FilterIcon, Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function FilterTours() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("searchTerm") || undefined;
  const selectDivision = searchParams.get("division") || undefined;
  const selectTourType = searchParams.get("tourType") || undefined;
  const selectSort = searchParams.get("sort") || undefined;

  const { data: divisions, isLoading: divisionLoading } = useGetDivisionsQuery({
    limit: 50,
    fields: "_id, name",
  });

  const { data: tourTypes, isLoading: tourTypeLoading } = useGetTourTypesQuery({
    limit: 50,
    fields: "_id, name",
  });

  const divisionOptions = divisions?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypes?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("searchTerm", e.target.value);
    } else {
      params.delete("searchTerm");
    }
    setSearchParams(params);
  };

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    setSearchParams(params);
  };

  const handleFilterClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("searchTerm");
    params.delete("division");
    params.delete("tourType");
    params.delete("sort");
    setSearchParams(params);
  };

  return (
    <section className="md:sticky md:top-24 lg:w-1/3 xl:w-1/4 bg-card rounded-2xl md:h-96 p-6 shadow-md border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filter Tours</h2>
        <div className="flex items-center gap-x-1">
          <Button variant="outline" size="sm" onClick={handleFilterClear}>
            Clear Filter
          </Button>
          {isFilterOpen ? (
            <Button
              variant="outline"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <X className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FilterIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <div
        className={`space-y-5 transition-all duration-300 ease-in-out
          ${
            isFilterOpen
              ? "max-h-[2000px] opacity-100 "
              : "max-h-0 opacity-0 overflow-hidden"
          }
          md:max-h-full md:opacity-100`}
      >
        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours..."
            className="pl-10 w-full"
            value={search ?? ""}
            onChange={handleSearch}
          />
        </div>

        {/* Division */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Division
          </label>
          <Select
            onValueChange={handleDivisionChange}
            value={selectDivision ? selectDivision : ""}
            disabled={divisionLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {divisionOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        {/* Tour Type  */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Tour Type
          </label>
          <Select
            onValueChange={handleTourTypeChange}
            value={selectTourType ? selectTourType : ""}
            disabled={tourTypeLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Sort By
          </label>
          <Select
            onValueChange={handleSortChange}
            value={selectSort ? selectSort : ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
