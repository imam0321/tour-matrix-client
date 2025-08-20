import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function FilterTours() {
  return (
    <section className="lg:w-1/3 xl:w-1/4 bg-card rounded-2xl h-96 p-6 shadow-md border animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-primary">Filter Tours</h2>
      <div className="space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tours or destinations..."
            className="pl-10 w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Category
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="romantic">Romantic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Price Range
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100">$0 - $100</SelectItem>
              <SelectItem value="100-500">$100 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1000</SelectItem>
              <SelectItem value="1000+">$1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Sort By
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
