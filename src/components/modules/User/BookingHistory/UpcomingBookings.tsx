import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays, format } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import type { IBookingsProps } from "./BookingStats";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UpcomingBookings({
  bookings,
  isLoading,
}: IBookingsProps) {
  const upcomingBookings = bookings.filter(
    (b) => b.tour?.startDate && new Date(b.tour.startDate) > new Date()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 rounded-md">
          <div className="space-y-4">
            {upcomingBookings.map((booking) => {
              const start = new Date(booking.tour.startDate || "");
              const end = new Date(booking.tour.endDate || "");
              const days = differenceInDays(end, start) + 1;
              return (
                <div key={booking._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{booking.tour.title}</h3>
                    <Badge
                      variant={
                        booking.status === "COMPLETE" ? "default" : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
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
                    <span className="font-semibold text-primary">
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
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
