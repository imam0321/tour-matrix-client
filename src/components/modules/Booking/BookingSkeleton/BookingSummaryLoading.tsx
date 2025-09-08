import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSummaryLoading() {
  return (
    <div className="lg:col-span-2">
      <Card className="shadow-md rounded-xl border pt-1">
        <CardContent className="space-y-4 p-4">
          {/* Image skeleton */}
          <Skeleton className="w-full h-40 sm:h-52 rounded-lg bg-accent-foreground" />

          {/* Title & Description skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-2/3 bg-accent-foreground" />
            <Skeleton className="h-4 w-full bg-accent-foreground" />
            <Skeleton className="h-4 w-5/6 bg-accent-foreground" />

            {/* Location & Date skeleton */}
            <div className="flex flex-col sm:flex-row justify-between md:items-center gap-2">
              <Skeleton className="h-4 w-40 bg-accent-foreground" />
              <Skeleton className="h-6 w-32 bg-accent-foreground" />
            </div>
          </div>

          <Separator />

          {/* What’s Included skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-2/3 bg-accent-foreground" />
              <Skeleton className="h-4 w-1/2 bg-accent-foreground" />
              <Skeleton className="h-4 w-3/4 bg-accent-foreground" />
            </div>
          </div>

          <Separator />

          {/* Tour Plan skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-28 bg-accent-foreground" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-2/3 bg-accent-foreground" />
              <Skeleton className="h-4 w-1/2 bg-accent-foreground" />
              <Skeleton className="h-4 w-3/4 bg-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
