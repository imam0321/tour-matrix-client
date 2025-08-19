import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router";

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  maxGuests: number;
  image: string;
  featured?: boolean;
}

export default function TourCard({
  id,
  title,
  location,
  price,
  duration,
  rating,
  maxGuests,
  image,
  featured = false,
}: TourCardProps) {
  return (
    <Card className="group p-[-2em] hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
      <CardHeader className="p-0 relative">
        <div className="">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {featured && (
          <Badge className="absolute top-3 left-3 bg-chart-2 text-white border-0">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 glass-effect px-2 py-1 rounded-full">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </CardHeader>

      <CardContent className="px-3">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>

        <span className="text-sm text-gray-600"><MapPin className="w-4 h-4 inline" /> {location} → {location}</span>

        <div className="mb-1 text-muted-foreground">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="font-medium">Form:</span> {location}
            </p>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        <div className="mb-1 text-muted-foreground">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="font-medium">To:</span> {location}
            </p>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Max {maxGuests}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-muted-foreground">Cost: </span>
            <span className="text-lg font-semibold text-chart-2">${price}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button asChild className="w-full bg-primary/80 border-0">
          <Link to={`/tour/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
