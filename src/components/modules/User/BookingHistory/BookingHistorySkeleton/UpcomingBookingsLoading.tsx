import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UpcomingBookingsLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-32" /> {/* Placeholder for title */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 rounded-md">
          <div className="space-y-4">
            {/* Single card skeleton */}
            <div className="p-4 border rounded-lg space-y-3">
              <Skeleton className="h-6 w-3/4" /> {/* Tour title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" /> {/* Location */}
                <Skeleton className="h-4 w-2/3" /> {/* Dates */}
                <Skeleton className="h-4 w-1/4" /> {/* Days */}
                <Skeleton className="h-4 w-1/3" /> {/* Guests */}
              </div>
              <Skeleton className="h-10 w-full mt-2" /> {/* Button */}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
