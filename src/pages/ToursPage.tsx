import heroImage from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { MapPin, Clock, Star } from "lucide-react";

export default function ToursPage() {
  const data = [
    {
      _id: "1",
      slug: "adventure-mountains",
      title: "Adventure in the Mountains",
      description:
        "Experience the thrill of mountain adventures, trekking, and stunning views.",
      images: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      ],
      costFrom: 250,
      maxGuest: 8,
      departureLocation: "Kathmandu",
      arrivalLocation: "Pokhara",
      tourPlan: ["Day 1", "Day 2", "Day 3"],
      minAge: 12,
      amenities: ["Meals Included", "Guide", "Transport"],
      rating: 4.5,
      featured: true,
    },
    {
      _id: "2",
      slug: "beach-getaway",
      title: "Relaxing Beach Getaway",
      description:
        "Unwind at pristine beaches with sun, sand, and clear waters. Perfect for families and couples.",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      ],
      costFrom: 400,
      maxGuest: 6,
      departureLocation: "Cox's Bazar",
      arrivalLocation: "Saint Martin",
      tourPlan: ["Day 1", "Day 2", "Day 3", "Day 4"],
      minAge: 10,
      amenities: ["Snorkeling", "Meals Included", "Guide", "Transport"],
      rating: 4.8,
      featured: false,
    },
    {
      _id: "3",
      slug: "cultural-heritage",
      title: "Cultural Heritage Tour",
      description:
        "Explore historic landmarks, local traditions, and immerse yourself in rich culture.",
      images: [
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
      ],
      costFrom: 300,
      maxGuest: 10,
      departureLocation: "Dhaka",
      arrivalLocation: "Bagerhat",
      tourPlan: ["Day 1", "Day 2"],
      minAge: 8,
      amenities: ["Guide", "Transport", "Meals Included"],
      rating: 4.7,
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-40 md:h-40 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-slide-up">
            Explore Our Tours
          </h1>
          <p className="text-lg md:text-xl text-gray-200 animate-fade-in">
            Discover amazing destinations and create unforgettable memories
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 mx-6 lg:mx-12 mb-16">
        {/* Sidebar */}
        <section className="lg:w-1/3 xl:w-1/4 bg-card rounded-2xl h-96 p-6 shadow-md border animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Filter Tours
          </h2>
          <div className="space-y-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours or destinations..."
                className="pl-10 w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Category
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="romantic">Romantic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Price Range
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-500">$100 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1000</SelectItem>
                  <SelectItem value="1000+">$1000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Sort By
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <main className="flex-1 animate-fade-in grid grid-cols-1 gap-6">
          {data.map((item) => (
            <Card
              key={item.slug}
              className="group p-[-2em] flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              {/* Image Section */}
              <div className="relative md:w-1/3 h-48 md:h-auto">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.featured && (
                  <Badge className="absolute top-3 left-3 bg-chart-2 text-white">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-muted/90 px-2 py-1 rounded-full backdrop-blur">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-between md:w-2/3">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>
                      <MapPin className="w-4 h-4 inline mr-1" />{" "}
                      {item.departureLocation} → {item.arrivalLocation}
                    </span>
                    <span>
                      <Clock className="w-4 h-4 inline mr-1" />{" "}
                      {item.tourPlan.length} days
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link to={`/tours/${item._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
