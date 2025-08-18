import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Shield } from "lucide-react";

const choose = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Award,
    title: "Expert Guides",
    description:
      "Professional local guides with deep knowledge of destinations and cultures.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Partnerships worldwide ensure authentic experiences and competitive pricing.",
  },
];

export default function Choose() {
  return (
    <section className="py-16 bg-muted/50 mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Tour Matrix
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing exceptional travel experiences that
            exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {choose.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="relative p-[2px] rounded-2xl border animate-gradient border-gradient"
            >
              <Card className="text-center p-6 animate-fade-in">
                <CardContent className="pt-6">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
