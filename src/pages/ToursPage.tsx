import FilterTours from "@/components/modules/Tours/FilterTours";
import HeroTours from "@/components/modules/Tours/HeroTours";
import TourCard from "@/components/modules/Tours/TourCard";
import FilterToursLoading from "@/components/modules/Tours/ToursSkeleton/FilterToursLoading";
import HeroToursLoading from "@/components/modules/Tours/ToursSkeleton/HeroToursLoading";
import TourCardLoading from "@/components/modules/Tours/ToursSkeleton/TourCardLoading";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import type { ITourResponse } from "@/types";
import PaginationData from "@/utils/PaginationData";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function ToursPage() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const limit = 4;

  const searchTerm = searchParams.get("searchTerm") || undefined;
  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  const sort = searchParams.get("sort") || undefined;

  const { data, isLoading, isFetching } = useGetToursQuery({
    page,
    limit,
    division,
    tourType,
    searchTerm,
    sort,
  });
  const meta = data?.meta;

  return (
    <div className="min-h-screen">
      {isLoading ? <HeroToursLoading /> : <HeroTours />}

      <div className="flex flex-col lg:flex-row gap-8 mt-8 mx-6 lg:mx-12 mb-16">
        {isLoading ? <FilterToursLoading /> : <FilterTours />}

        <main className="flex-1 space-y-4">
          {isLoading || isFetching
            ? Array.from({ length: 4 }).map((_, i) => (
                <TourCardLoading key={i} />
              ))
            : data?.data.map((tour: ITourResponse) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
          {!isLoading && meta && meta.totalPage > 1 && (
            <PaginationData
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
