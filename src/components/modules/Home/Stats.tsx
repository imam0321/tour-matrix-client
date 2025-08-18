import { Award, Globe, Shield, Star } from "lucide-react";

const stats = [
  { icon: Globe, value: "50+", label: "Destinations" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: Shield, value: "10k+", label: "Happy Travelers" },
  { icon: Award, value: "15", label: "Awards Won" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div key={index} className="text-center animate-fade-in">
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {value}
              </div>
              <div className="text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
