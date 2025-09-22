import BookingStats from "@/components/modules/User/BookingHistory/BookingStats";
import UpcomingBookings from "@/components/modules/User/BookingHistory/UpcomingBookings";
import PastBookings from "@/components/modules/User/BookingHistory/PastBookings";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking";

export default function BookingHistory() {
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  const bookings = data?.data || [];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-2">
        <div className="max-w-6xl mx-auto md:px-4 px-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">Bookings History</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 w-full">
            <BookingStats bookings={bookings} isLoading={isLoading} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Upcoming Bookings */}
            <UpcomingBookings bookings={bookings} isLoading={isLoading} />

            {/* Past Bookings */}
            <PastBookings bookings={bookings} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
