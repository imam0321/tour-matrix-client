import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router";
import AboutCover from "@/assets/images/aboutCover.png";

export default function About() {
  return (
    <section className="min-h-screen flex items-center bg-background">
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold sm:text-5xl leading-tight">
              About <span className="text-primary">Tour Matrix</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tour Matrix is a modern travel platform designed to simplify trip
              planning. Explore destinations, find hidden gems, and create
              unforgettable experiences with ease. We connect travelers to
              authentic experiences worldwide.
            </p>
            <Button size="lg" className="mt-4 shadow-lg hover:scale-105 transition-transform" asChild>
              <Link to="/">Get Started</Link>
            </Button>
          </div>

          {/* Image or Illustration */}
          <div className="flex justify-center">
            <Card className="shadow-xl rounded-2xl overflow-hidden w-full max-w-md border border-border/75 bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Explore with Us</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={AboutCover}
                  alt="Travel illustration"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <CardDescription className="mt-4 text-sm text-muted-foreground">
                  Discover exciting destinations and plan your perfect trip with Tour Matrix.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
