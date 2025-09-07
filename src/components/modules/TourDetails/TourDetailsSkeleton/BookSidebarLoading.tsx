import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookSidebarLoading() {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 shadow-lg animate-pulse">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-4 w-12 mt-1 rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-4">
          {/* Guest & Age */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>

          {/* Location */}
          <Skeleton className="h-4 w-3/4 rounded-md" />

          {/* Dates */}
          <Skeleton className="h-4 w-full rounded-md" />

          {/* Book Now Button */}
          <Skeleton className="h-10 w-full mt-4 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
