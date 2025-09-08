import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import TourDetailHero from "@/components/modules/TourDetails/TourDetailHero";
import Overview from "@/components/modules/TourDetails/Overview";
import Itinerary from "@/components/modules/TourDetails/Itinerary";
import Excluded from "@/components/modules/TourDetails/Excluded";
import Reviews from "@/components/modules/TourDetails/Reviews";
import BookSidebar from "@/components/modules/TourDetails/BookSidebar";
import HeroToursLoading from "@/components/modules/Tours/ToursSkeleton/HeroToursLoading";
import BookSidebarLoading from "@/components/modules/TourDetails/TourDetailsSkeleton/BookSidebarLoading";
import OverviewLoading from "@/components/modules/TourDetails/TourDetailsSkeleton/OverviewLoading";
import { Skeleton } from "@/components/ui/skeleton";

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetToursQuery({ _id: id });

  const tour = data?.data?.[0];

  return (
    <div className="min-h-screen flex flex-col mb-20">
      <main className="flex-1">
        {/* Hero Section */}
        {isLoading ? (
          <HeroToursLoading />
        ) : (
          tour && (
            <TourDetailHero
              images={tour.images}
              title={tour.title}
              location={tour.location}
              startDate={tour.startDate}
              endDate={tour.endDate}
              maxGuest={tour.maxGuest}
            />
          )
        )}

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <TabsList className="grid w-full grid-cols-4 rounded-md shadow shadow-blue-400/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="excluded">Excluded</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                )}
                {/* Tab Contents */}
                {isLoading ? (
                  <OverviewLoading rows={6} cols={3} />
                ) : (
                  tour && (
                    <Overview
                      description={tour.description}
                      included={tour.included}
                      amenities={tour.amenities}
                      tourType={tour.tourType.name}
                      division={tour.division.name}
                    />
                  )
                )}

                {!isLoading && tour && <Itinerary tourPlan={tour.tourPlan} />}
                {!isLoading && tour && <Excluded excluded={tour.excluded} />}
                <Reviews />
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            {isLoading ? (
              <BookSidebarLoading />
            ) : (
              tour && (
                <BookSidebar
                  id={tour._id}
                  cost={tour.costFrom}
                  minAge={tour.minAge}
                  startDate={tour.startDate}
                  endDate={tour.endDate}
                  maxGuest={tour.maxGuest}
                  location={tour.location}
                />
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
