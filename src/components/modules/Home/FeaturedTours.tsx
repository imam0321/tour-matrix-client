import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import HomeTourCard from "../Tours/HomeTourCard";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import type { ITourResponse } from "@/types";

export default function FeaturedTours() {
  const { data, isLoading, isError } = useGetToursQuery({ page: 1, limit: 4 });

  if (isLoading) return <p>Loading tours...</p>;
  if (isError) return <p>Failed to load tours.</p>;

  return (
    <section className="my-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Tours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular destinations and start planning your
            perfect getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {data?.data?.map((tour: ITourResponse) => (
            <HomeTourCard key={tour._id} tour={tour} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            onClick={() => window.scrollTo(0, 0)}
            className="shadow-blue-400 hover:scale-105 transition-transform"
          >
            <Link to="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
