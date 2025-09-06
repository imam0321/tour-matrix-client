import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import heroImage from "@/assets/images/hero.jpg";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
          Discover Your Next
          <span className="block text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text">
            Adventure
          </span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in">
          Explore breathtaking destinations and create unforgettable memories
          with our expertly curated travel experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button size="lg" className="border-0 px-8 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link
              to="/tours"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              Explore Tours <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
