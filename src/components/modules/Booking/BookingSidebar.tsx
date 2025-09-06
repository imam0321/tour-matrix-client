import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface IBookingSidebarProps {
  id: string;
  costFrom: number;
  maxGuest: number;
  minAge: number;
}

export default function BookingSidebar({
  id,
  costFrom,
  maxGuest,
  minAge,
}: IBookingSidebarProps) {
  const [guestCount, setGuestCount] = useState(1);

  const finalTotal = costFrom * guestCount;

  const increaseGuests = () => {
    if (guestCount < maxGuest) {
      setGuestCount((prev) => prev + 1);
    }
  };

  const decreaseGuests = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const handleBooking = (tour: string) => {
    console.log("Booking data:", { tour, guestCount });
  };

  return (
    <div className="space-y-4 lg:sticky lg:top-20 h-fit">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Guests Counter */}
          <div className="flex justify-between text-sm sm:text-base pe-1">
            <p>Min Age : {minAge}</p>
            <p>Max Guests : {maxGuest}</p>
          </div>
          <div className="w-full flex items-center justify-between gap-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg p-1 text-lg font-semibold transition">
            <button
              type="button"
              onClick={decreaseGuests}
              className="text-xl ms-2 hover:bg-slate-600 px-2 rounded"
            >
              -
            </button>
            <span>{guestCount}</span>
            <button
              type="button"
              onClick={increaseGuests}
              className="text-lg me-2 hover:bg-slate-600 px-2 rounded"
            >
              +
            </button>
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Price per person</span>
              <span className="font-medium">{costFrom} Tk</span>
            </div>
            <div className="flex justify-between">
              <span>Guests</span>
              <span className="font-medium">{guestCount}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-semibold text-lg sm:text-xl">
              <span>Total</span>
              <span className="text-primary font-semibold">
                {finalTotal.toLocaleString()} Tk
              </span>
            </div>
          </div>

          <Button
            onClick={() => handleBooking(id)}
            className="w-full transition active:scale-95 hover:opacity-90"
          >
            Book now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
