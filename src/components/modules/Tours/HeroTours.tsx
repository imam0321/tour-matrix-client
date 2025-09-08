import heroImage from "@/assets/images/hero.jpg";

export default function HeroTours() {
  return (
    <section className="relative h-40 flex items-center justify-center overflow-hidden">
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
  );
}
