import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TourCardLoading() {
  return (
    <Card className="group p-[-2rem] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md">
      {/* Image Section */}
      <div className="relative md:w-1/3 h-48 md:h-auto">
        <Skeleton className="w-full h-full object-cover" />
        <Skeleton className="absolute top-3 left-3 w-16 h-6 rounded-full" />
        <Skeleton className="absolute top-3 right-3 w-16 h-6 rounded-full" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between md:w-2/3">
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-5/6" /> 
          <div className="flex gap-3">
            <Skeleton className="h-4 w-24" /> 
            <Skeleton className="h-4 w-32" /> 
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Skeleton className="h-10 w-full rounded-md" /> 
        </CardFooter>
      </div>
    </Card>
  );
}
