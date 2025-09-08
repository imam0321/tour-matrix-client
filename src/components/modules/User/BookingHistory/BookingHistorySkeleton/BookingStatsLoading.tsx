import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingStatsLoading() {
  return (
    <>
      {[...Array(4)].map((_, idx) => (
        <Card key={idx}>
          <CardHeader className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded" /> {/* title */}
            <Skeleton className="h-4 w-4 rounded-full" /> {/* icon */}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 rounded mb-2" /> {/* value */}
            <Skeleton className="h-3 w-20 rounded" /> {/* subtitle */}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
