import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import type { ITourResponse } from "@/types";

interface IBookingProps {
  tour: ITourResponse;
}

export default function BookingSummary({ tour}: IBookingProps) {
 
  return (
    <div className="lg:col-span-2">
      <Card className="shadow-md rounded-xl border pt-1">
        <CardContent className="space-y-4 p-4">
          {/* Image */}
          <div className="w-full h-40 sm:h-52 rounded-lg overflow-hidden">
            <img
              src={tour?.images?.[0]}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Tour Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg sm:text-xl">{tour.title}</h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {tour?.description}
            </p>

            {/* Location & Date */}
            <div className="flex flex-col sm:flex-row justify-between md:items-center gap-2 text-sm">
              <div className="flex items-center gap-x-1">
                <MapPin className="w-4 h-4" />
                <p className="truncate">Dhaka → {tour?.location}</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-xs sm:text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {format(tour.startDate, "PP")} to {format(tour.endDate, "PP")}
                </span>
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold">
              What’s Included
            </h2>
            <ul className="text-sm sm:text-base text-gray-400 list-disc list-inside space-y-1">
              {tour.included.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold">Tour Plan</h2>
            <ul className="text-sm sm:text-base text-gray-400 list-disc list-inside space-y-1">
              {tour.tourPlan.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
