import { useParams } from "react-router";
import BookingSummary from "@/components/modules/Booking/BookingSummary";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import BookingSidebar from "@/components/modules/Booking/BookingSidebar";
import BookingSummaryLoading from "@/components/modules/Booking/BookingSummaryLoading";
import BookingSidebarLoading from "@/components/modules/Booking/BookingSidebarLoading";

export default function BookingPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetToursQuery({ _id: id });

  const tour = data?.data?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Booking Summary */}
            {isLoading ? (
              <BookingSummaryLoading />
            ) : isError ? (
              <div className="lg:col-span-2 text-center text-red-500">
                Failed to load tour details.
              </div>
            ) : (
              tour && <BookingSummary tour={tour} />
            )}

            {/* Booking Form */}
            {isLoading ? (
              <BookingSidebarLoading />
            ) : isError ? (
              <div className="lg:col-span-2 text-center text-red-500">
                Failed to load tour details.
              </div>
            ) : (
              tour && (
                <BookingSidebar
                  id={tour._id}
                  costFrom={tour.costFrom}
                  maxGuest={tour.maxGuest}
                  minAge={tour.minAge}
                />
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
