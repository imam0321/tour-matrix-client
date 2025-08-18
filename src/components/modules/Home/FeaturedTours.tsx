import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import mountainTour from "@/assets/images/tour-2.jpg";
import tropicalIsland from "@/assets/images/tour-3.jpg";
import culturalCity from "@/assets/images/tour-4.jpg";
import TourCard from "../Admin/Tours/TourCard";

const featuredTours = [
  {
    id: "1",
    title: "Tropical Paradise Escape",
    location: "Maldives",
    price: 2499,
    duration: "7 days",
    rating: 4.9,
    maxGuests: 2,
    image: tropicalIsland,
    featured: true,
  },
  {
    id: "2",
    title: "Mountain Adventure Trek",
    location: "Swiss Alps",
    price: 1899,
    duration: "5 days",
    rating: 4.8,
    maxGuests: 8,
    image: mountainTour,
  },
  {
    id: "3",
    title: "Cultural City Discovery",
    location: "Prague",
    price: 1299,
    duration: "4 days",
    rating: 4.7,
    maxGuests: 12,
    image: culturalCity,
  },
  {
    id: "4",
    title: "Cultural City Discovery",
    location: "Prague",
    price: 1299,
    duration: "4 days",
    rating: 4.7,
    maxGuests: 12,
    image: culturalCity,
  },
];

export default function FeaturedTours() {
  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Tours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular destinations and start planning your
            perfect getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
