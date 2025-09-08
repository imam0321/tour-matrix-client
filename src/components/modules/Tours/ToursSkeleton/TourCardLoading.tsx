import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TourCardLoading() {
  return (
    <Card className="flex flex-col p-[-2em] md:flex-row overflow-hidden rounded-2xl shadow-md animate-pulse">
      <div className="relative md:w-1/3 h-48 md:h-auto">
        <Skeleton className="w-full h-full bg-accent-foreground" />
        <Skeleton className="absolute top-3 left-3 h-6 w-16 rounded-md bg-gray-500" />
        <Skeleton className="absolute top-3 right-3 h-6 w-12 rounded-full bg-gray-500" />
      </div>

      <div className="flex flex-col justify-between md:w-2/3">
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-6 w-full bg-accent-foreground" />
          <Skeleton className="h-4 w-full bg-accent-foreground" />
          <Skeleton className="h-4 w-1/2 bg-accent-foreground" />
          <Skeleton className="h-4 w-1/3 bg-accent-foreground" />

          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-md bg-accent-foreground" />
            <Skeleton className="h-5 w-16 rounded-md bg-accent-foreground" />
            <Skeleton className="h-5 w-16 rounded-md bg-accent-foreground" />
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Skeleton className="h-10 w-full rounded-md bg-accent-foreground" />
        </CardFooter>
      </div>
    </Card>
  );
}
