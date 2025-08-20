import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    initials: "JD",
    rating: 5,
    timeAgo: "2 weeks ago",
    comment:
      "Amazing experience! The tour exceeded all expectations. Highly recommended for anyone looking for adventure and relaxation.",
  },
  {
    id: 2,
    name: "Sarah Khan",
    initials: "SK",
    rating: 4,
    timeAgo: "1 month ago",
    comment:
      "Great service and well-organized trip. A few minor delays, but overall a wonderful journey.",
  },
  {
    id: 3,
    name: "Michael Lee",
    initials: "ML",
    rating: 5,
    timeAgo: "3 months ago",
    comment:
      "One of the best trips I've ever taken! Everything was smooth, and the guide was very knowledgeable.",
  },
];

export default function Reviews() {
  return (
    <TabsContent value="reviews" className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <div className="flex items-start gap-4">
                {/* Avatar / Initials */}
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {review.initials}
                  </span>
                </div>

                {/* Review Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-2">
                    {review.timeAgo}
                  </p>
                  <p>{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
