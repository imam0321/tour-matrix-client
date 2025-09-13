import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, MapPin, Star } from "lucide-react";
import BookingStatsLoading from "./BookingHistorySkeleton/BookingStatsLoading";
import type { IBookingData } from "@/types";

export interface IBookingsProps {
  bookings: IBookingData[];
  isLoading: boolean;
}

export default function BookingStats({ bookings, isLoading }: IBookingsProps) {
  const upcomingCount = bookings.filter(
    (b) => new Date(b.tour?.startDate || 0) > new Date()
  ).length;

  const totalSpent = bookings.reduce(
    (sum, booking) => sum + (booking.status == "COMPLETE" && booking.tour?.costFrom || 0),
    0
  );

  const uniqueDestinationsSet = new Set(bookings.map((b) => b.tour?._id));
  const uniqueDestinations = uniqueDestinationsSet.size;

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      subtitle: `${upcomingCount} upcoming`,
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Spent",
      value: totalSpent,
      subtitle: "Across all trips",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Destinations Visited",
      value: uniqueDestinations,
      subtitle: `${
        uniqueDestinations < bookings.length
          ? bookings.length - uniqueDestinations
          : 0
      } more planned`,
      icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Average Rating",
      value: "5.0",
      subtitle: "From completed trips",
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <>
      {isLoading ? (
        <BookingStatsLoading />
      ) : (
        stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
}
