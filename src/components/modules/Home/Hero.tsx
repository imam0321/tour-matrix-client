import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-xl scale-105 transition-opacity duration-700"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dzmvhztng/image/upload/w_50,q_10,f_auto/v1758403824/jhewhr1q24-1758403820873-hero-jpg.jpg.jpg)`,
        }}
      />

      {/* Full-res optimized background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dzmvhztng/image/upload/w_1600,f_auto,q_auto/v1758403824/jhewhr1q24-1758403820873-hero-jpg.jpg.jpg)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Preload hidden image to speed up */}
      <img
        src="https://res.cloudinary.com/dzmvhztng/image/upload/w_1600,f_auto,q_auto/v1758403824/jhewhr1q24-1758403820873-hero-jpg.jpg.jpg"
        alt="Hero Preload"
        className="hidden"
        loading="eager"
      />

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
          <Button
            size="lg"
            className="border-0 px-8 shadow-lg hover:scale-105 transition-transform"
            asChild
          >
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
