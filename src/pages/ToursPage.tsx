import FilterTours from "@/components/modules/Tours/FilterTours";
import HeroTours from "@/components/modules/Tours/HeroTours";
import TourCard from "@/components/modules/Tours/TourCard";
import FilterToursLoading from "@/components/modules/Tours/ToursSkeleton/FilterToursLoading";
import HeroToursLoading from "@/components/modules/Tours/ToursSkeleton/HeroToursLoading";
import TourCardLoading from "@/components/modules/Tours/ToursSkeleton/TourCardLoading";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import type { ITourResponse } from "@/types";

export default function ToursPage() {
  const { data, isLoading, isError } = useGetToursQuery({ page: 1, limit: 4 });

  if (isError) return <p>Failed to load tours.</p>;

  return (
    <div className="min-h-screen">
      {isLoading ? <HeroToursLoading /> : <HeroTours />}

      <div className="flex flex-col lg:flex-row gap-8 mt-8 mx-6 lg:mx-12 mb-16">
        {isLoading ? <FilterToursLoading /> : <FilterTours />}

        <main className="flex-1 animate-fade-in grid grid-cols-1 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <TourCardLoading key={i} />
              ))
            : data?.data.map((tour: ITourResponse) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
        </main>
      </div>
    </div>
  );
}
