import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format, isBefore, parseISO } from "date-fns";
import { Calendar, User, Users, Heart, Share2, MapPin } from "lucide-react";
import { Link } from "react-router";

interface BookingSidebarProps {
  id: string;
  cost: number;
  minAge: number;
  startDate: string;
  endDate: string;
  maxGuest: number;
  location: string;
}

export default function BookSidebar({
  id,
  cost,
  minAge,
  startDate,
  endDate,
  maxGuest,
  location,
}: BookingSidebarProps) {
  const start = parseISO(startDate);
  const isBookingClosed = isBefore(start, new Date());

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-24 shadow-lg">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-primary">${cost}</span>
              <span className="text-sm text-muted-foreground block mt-1">
                per person
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 transition-colors"
              >
                <Heart className="w-4 h-4 text-red-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 transition-colors"
              >
                <Share2 className="w-4 h-4 text-primary" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Guest & Age */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>Max {maxGuest} guests</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Min age {minAge}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{location}</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>
              {format(parseISO(startDate), "PP")} →{" "}
              {format(parseISO(endDate), "PP")}
            </span>
          </div>

          {/* Book Now Button */}
          <Button
            asChild
            className={`w-full mt-4 border-0 ${
              isBookingClosed
                ? "bg-muted-foreground hover:bg-muted-foreground"
                : ""
            }`}
            size="lg"
            disabled={isBookingClosed}
          >
            {isBookingClosed ? (
              <span>Booking not available</span>
            ) : (
              <Link to={`/booking/${id}`}>Book</Link>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
