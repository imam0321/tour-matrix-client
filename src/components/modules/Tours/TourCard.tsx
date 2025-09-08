import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { MapPin, Clock, Calendar } from "lucide-react";
import type { TourCardProps } from "./HomeTourCard";
import { differenceInDays, format, parseISO } from "date-fns";

export default function TourCard({ tour }: TourCardProps) {
  const start = parseISO(tour.startDate);
  const end = parseISO(tour.endDate);
  const days = differenceInDays(end, start) + 1;

  const future = parseISO(tour.startDate) > new Date();
  return (
    <Card
      key={tour.slug}
      className="group p-[-2em] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all"
    >
      {/* Image Section */}
      <div className="relative md:w-1/3 h-48 md:h-auto">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {future && (
          <Badge className="absolute top-3 left-3 bg-chart-2 text-white border-0">
            Future
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 text-sm font-medium bg-black rounded-full">
          {tour.costFrom} Tk
        </Badge>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between md:w-2/3">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
          <p className="text-muted-foreground mb-3 line-clamp-2">
            {tour.description}
          </p>
          <div className="flex items-center text-sm text-accent-foreground mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            <p>Dhaka → {tour?.location}</p>
          </div>
          <div className="flex justify-between text-sm text-accent-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 inline mr-1" />
              <p>
                {format(tour?.startDate, "PP")} → {format(tour?.endDate, "PP")}
              </p>
            </div>
            <div className="flex items-center text-accent-foreground">
              <Clock className="w-4 h-4 inline mr-1" />
              <p>{days} days</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tour.amenities.slice(0, 3).map((amenity, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            asChild
            className="w-full"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Link to={`/tours/${tour._id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
