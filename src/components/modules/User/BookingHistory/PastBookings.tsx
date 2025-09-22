import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";
import type { IBookingsProps } from "./BookingStats";
import { differenceInDays, format } from "date-fns";
import { Link } from "react-router";
import UpcomingBookingsLoading from "./BookingHistorySkeleton/UpcomingBookingsLoading";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PastBookings({ bookings, isLoading }: IBookingsProps) {
  const pastBookings = bookings.filter(
    (b) => b.tour?.endDate && new Date(b.tour.endDate) < new Date()
  );

  if (isLoading) {
    return <UpcomingBookingsLoading />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Travel History
        </CardTitle>
      </CardHeader>
      <CardContent className="md:p-4 p-2">
        <ScrollArea className="h-96 sm:h-[500px] md:h-[600px] rounded-md">
          <div className="space-y-4">
            {pastBookings.length === 0 ? (
              <div>Past Booking not found</div>
            ) : (
              pastBookings.map((booking) => {
                const start = new Date(booking.tour.startDate || "");
                const end = new Date(booking.tour.endDate || "");
                const days = differenceInDays(end, start) + 1;
                return (
                  <div key={booking._id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{booking.tour.title}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {booking.tour.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(start, "PP")} to {format(end, "PP")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {days} days
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {booking.guestCount} guests
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-semibold">
                        ${booking.tour.costFrom}
                      </span>
                      <Button size="sm" variant="outline">
                        <Link to={`/tours/${booking.tour._id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
