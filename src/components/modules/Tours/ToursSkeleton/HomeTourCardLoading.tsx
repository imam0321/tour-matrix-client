import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeTourCardLoading() {
  return (
    <Card className="-p-3 overflow-hidden">
      <CardHeader className="p-0 relative">
        <Skeleton className="w-full h-40 rounded-md" />
        <Skeleton className="absolute top-3 left-3 h-6 w-16 rounded-md" />
        <Skeleton className="absolute top-3 right-3 h-6 w-12 rounded-full" />
      </CardHeader>

      <CardContent className="px-3 -mt-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>

      <CardFooter className="px-3 pb-3 mt-auto">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
