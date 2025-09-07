import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";

interface OverviewSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function OverviewLoading({ rows = 6, cols = 3 }: OverviewSkeletonProps) {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* About This Tour */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3 rounded-md" /> 
        <Skeleton className="h-4 w-full rounded-md" /> 
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>

      {/* Included */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4 rounded-md" /> 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: cols }).map((_, i) =>
            Array.from({ length: rows / cols }).map((_, j) => (
              <Skeleton key={`${i}-${j}`} className="h-4 w-full rounded-md" />
            ))
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4 rounded-md" /> 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: cols }).map((_, i) =>
            Array.from({ length: rows / cols }).map((_, j) => (
              <Skeleton key={`a-${i}-${j}`} className="h-4 w-full rounded-md" />
            ))
          )}
        </div>
      </div>
    </TabsContent>
  );
}
