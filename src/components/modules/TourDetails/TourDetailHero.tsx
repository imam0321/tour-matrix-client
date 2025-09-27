import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";

interface ITourDetailHeroProps {
  images: string[];
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  maxGuest: number;
}

export default function TourDetailHero({
  images,
  title,
  location,
  startDate,
  endDate,
  maxGuest,
}: ITourDetailHeroProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        let next = prev + direction;

        if (next >= images.length) {
          setDirection(-1);
          next = prev - 1;
        }

        if (next < 0) {
          setDirection(1);
          next = prev + 1;
        }

        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [direction, images.length]);

  const start = parseISO(startDate as string);
  const end = parseISO(endDate as string);
  const days = differenceInDays(end, start) + 1;

  return (
    <div className="relative h-50 overflow-hidden">
      <div
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover flex-shrink-0 filter contrast-125 brightness-90"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            <span>{location}</span>
          </div>
          <h1 className="md:text-4xl text-2xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.5</span>
            </div>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-0"
            >
              {days} days
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-0"
            >
              Max {maxGuest} guests
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
