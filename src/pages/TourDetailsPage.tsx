import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import { differenceInDays, parseISO } from "date-fns";
import { lazy } from "react";

import TourDetailHero from "@/components/modules/TourDetails/TourDetailHero";
const Overview = lazy(() => import("@/components/modules/TourDetails/Overview"));
const Itinerary = lazy(() => import("@/components/modules/TourDetails/Itinerary"));
const Excluded = lazy(() => import("@/components/modules/TourDetails/Excluded"));
const Reviews = lazy(() => import("@/components/modules/TourDetails/Reviews"));
import BookSidebar from "@/components/modules/TourDetails/BookSidebar";

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetToursQuery({ _id: id });

  const tour = data?.data?.[0];

  if (isLoading) return <p>Loading tour details...</p>;
  if (isError || !tour) return <p>Failed to load tour.</p>;

  const start = parseISO(tour.startDate as string);
  const end = parseISO(tour.endDate as string);
  const days = differenceInDays(end, start) + 1;

  return (
    <div className="min-h-screen flex flex-col mb-20">
      <main className="flex-1">
        {/* Hero Section */}
        <TourDetailHero
          images={tour.images as string[]}
          title={tour.title as string}
          location={tour.location as string}
          days={days}
          maxGuest={tour.maxGuest as number}
        />

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 rounded-md shadow shadow-blue-400/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="excluded">Excluded</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Tab Contents */}
                <Overview
                  description={tour.description as string}
                  included={tour.included as string[]}
                  amenities={tour.amenities as string[]}
                />
                <Itinerary tourPlan={tour.tourPlan as string[]} />
                <Excluded excluded={tour.excluded as string[]} />
                <Reviews />
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <BookSidebar
              id={tour._id as string}
              cost={tour.costFrom as number}
              minAge={tour.minAge as number}
              startDate={tour.startDate as string}
              endDate={tour.endDate as string}
              maxGuest={tour.maxGuest as number}
              location={tour.location as string}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
