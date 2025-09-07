import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";

export default function BookingSidebarLoading() {
  return (
    <div className="space-y-4 lg:sticky lg:top-20 h-fit">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Min Age & Max Guests */}
          <div className="flex justify-between text-sm sm:text-base pe-1">
            <Skeleton className="h-4 w-24 bg-accent-foreground" />
            <Skeleton className="h-4 w-28 bg-accent-foreground" />
          </div>

          {/* Guests Counter */}
          <Skeleton className="h-12 w-full rounded-lg bg-accent-foreground" />

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28 bg-accent-foreground" />
              <Skeleton className="h-4 w-16 bg-accent-foreground" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 bg-accent-foreground" />
              <Skeleton className="h-4 w-10 bg-accent-foreground" />
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-16 bg-accent-foreground" />
              <Skeleton className="h-6 w-24 bg-accent-foreground" />
            </div>
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-md bg-accent-foreground" />
        </CardContent>
      </Card>
    </div>
  );
}
