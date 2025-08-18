import Choose from "@/components/modules/Home/Choose";
import FeaturedTours from "@/components/modules/Home/FeaturedTours";
import Hero from "@/components/modules/Home/Hero";
import Stats from "@/components/modules/Home/Stats";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Stats />
      <FeaturedTours />
      <Choose />
    </div>
  );
}
