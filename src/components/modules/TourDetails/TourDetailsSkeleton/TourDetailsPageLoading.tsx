import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TourDetailsPageLoading() {
  return (
    <div className="min-h-screen flex flex-col mb-20 animate-pulse">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-16 space-y-4">
          <Skeleton className="h-10 w-2/3 mx-auto rounded-md" />
          <Skeleton className="h-6 w-1/2 mx-auto rounded-md" />
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tabs Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-4 gap-2">
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
