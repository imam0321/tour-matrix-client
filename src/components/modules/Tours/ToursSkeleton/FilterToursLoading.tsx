import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FilterToursLoading() {
  return (
    <Card className="lg:w-1/3 xl:w-1/4 h-96 p-6 shadow-md border rounded-2xl animate-pulse space-y-5">
      <Skeleton className="h-6 w-1/3" />

      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </Card>
  );
}
