import Hero from "@/components/modules/Home/Hero";
import Stats from "@/components/modules/Home/Stats";
import { lazy, Suspense } from "react";
import HomeTourCardLoading from "@/components/modules/Tours/ToursSkeleton/HomeTourCardLoading";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedTours = lazy(() => import("@/components/modules/Home/FeaturedTours"));
const Choose = lazy(() => import("@/components/modules/Home/Choose"));
const ReviewSection = lazy(() => import("@/components/modules/Home/ReviewSection"));

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Stats />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 my-16">
            {Array.from({ length: 4 }).map((_, i) => (
              <HomeTourCardLoading key={i} />
            ))}
          </div>
        }
      >
        <FeaturedTours />
      </Suspense>
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 my-16">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        }
      >
        <Choose />
      </Suspense>
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 py-16">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>
        }
      >
        <ReviewSection />
      </Suspense>
    </div>
  );
}
