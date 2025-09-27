import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router";
import type { ITourResponse } from "@/types";
import { format, parseISO } from "date-fns";

export interface TourCardProps {
  tour: ITourResponse;
}

export default function HomeTourCard({ tour }: TourCardProps) {
  const future = parseISO(tour.startDate) > new Date();

  return (
    <Card className="group -p-3 transition-all duration-300 overflow-hidden animate-fade-in hover:shadow-xl hover:shadow-blue-400/10">
      <CardHeader className="p-0 relative">
        <div>
          <img
            src={tour?.images?.[0]}
            alt={tour?.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {future && (
          <Badge className="absolute top-3 left-3 bg-chart-2 text-white border-0">
            Future
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 text-sm font-medium bg-black rounded-full">
          {tour.costFrom} Tk
        </Badge>
      </CardHeader>

      <CardContent className="px-3 -mt-4">
        <h3 className="font-semibold text-lg mb-2">
          {tour?.title.length > 25
            ? tour.title.slice(0, 25) + "..."
            : tour.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {tour?.description.length > 80
            ? tour.description.slice(0, 80) + "..."
            : tour.description}
        </p>

        <div className="flex items-center gap-x-1 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <p>
            {format(tour?.startDate, "PP")} → {format(tour?.endDate, "PP")}
          </p>
        </div>

        <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <p>Dhaka → {tour?.location}</p>
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 mt-auto">
        <Button asChild className="w-full bg-primary/80" onClick={() => window.scrollTo(0, 0)}>
          <Link to={`/tours/${tour?._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
