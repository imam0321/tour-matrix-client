import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Imran Hossain",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    content:
      "Tour Matrix made my Sundarbans trip unforgettable! Everything was well organized and stress-free.",
    date: "2025-08-15",
  },
  {
    id: 2,
    name: "Sarah Khan",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    content:
      "Great service and friendly guides. I enjoyed the Cox’s Bazar beach trip a lot.",
    date: "2025-09-01",
  },
  {
    id: 3,
    name: "David Lee",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    content:
      "An amazing experience exploring Srimangal tea gardens! Highly recommend Tour Matrix.",
    date: "2025-09-10",
  },
  {
    id: 4,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    content:
      "Good value for money and excellent arrangements. Would love to book again.",
    date: "2025-09-18",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="mt-3 text-gray-600">
            Thousands of happy travelers have trusted{" "}
            <span className="font-semibold">Tour Matrix</span> for their
            unforgettable journeys.
          </p>
        </div>

        <Carousel
          opts={{ align: "start" }}
          className="w-full max-w-6xl mx-auto relative"
        >
          <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>

          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
              >
                <Card className="h-full shadow-md rounded-2xl border hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {review.name}
                      </CardTitle>
                      <StarRating rating={review.rating} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">
                      “{review.content}”
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(review.date).toDateString()}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
