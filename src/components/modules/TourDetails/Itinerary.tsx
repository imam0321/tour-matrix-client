import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface IItineraryProps {
  tourPlan: string[];
}

export default function Itinerary({ tourPlan }: IItineraryProps) {
  return (
    <TabsContent value="itinerary" className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
      <div className="space-y-4">
        {tourPlan.map((plan, index) => (
          <div className="rounded-2xl border animate-gradient border-gradient">
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <CardTitle className="text-lg font-semibold">Day {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-md text-accent-foreground leading-relaxed">
                {plan.slice(6)}
              </CardDescription>
            </CardContent>
            </Card>
            </div>
        ))}
      </div>
    </TabsContent>
  );
}
