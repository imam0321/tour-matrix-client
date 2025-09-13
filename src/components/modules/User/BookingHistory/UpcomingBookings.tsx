/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays, format } from "date-fns";
import { Calendar, Clock, Download, MapPin, Users } from "lucide-react";
import type { IBookingsProps } from "./BookingStats";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  useInitPaymentMutation,
  useLazyPaymentInvoiceQuery,
} from "@/redux/features/payment/payment";
import { useState } from "react";

export default function UpcomingBookings({
  bookings,
  isLoading,
}: IBookingsProps) {
  const [initPayment, { isLoading: initPaymentLoading }] =
    useInitPaymentMutation();
  const [triggerInvoice, { isLoading: isDownloadingInvoice }] =
    useLazyPaymentInvoiceQuery();

  const [loadingInvoiceId, setLoadingInvoiceId] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(
    (b) => b.tour?.startDate && new Date(b.tour.startDate) > new Date()
  );

  const handleInitPayment = async (id: string) => {
    const toastId = toast.loading("Init payment processing...");
    try {
      const res = await initPayment(id).unwrap();

      toast.dismiss(toastId);

      if (res?.success && res?.data?.paymentUrl) {
        toast.success("Redirecting to payment...");
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleDownloadInvoice = async (paymentId: string) => {
    setLoadingInvoiceId(paymentId);
    const toastId = toast.loading("Invoice downloading");
    try {
      const res = await triggerInvoice(paymentId).unwrap();

      if (res.success && res.data) {
        const fileResponse = await fetch(res.data);

        if (!fileResponse.ok) {
          throw new Error("Failed to fetch the invoice file.");
        }

        const blob = await fileResponse.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `tour-matrix-invoice-${paymentId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);

        toast.success("Invoice downloaded successfully", { id: toastId });
      } else {
        toast.error("Failed to get invoice.", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data?.message, { id: toastId });
    } finally {
      setLoadingInvoiceId(null);
    }
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 rounded-md">
          <div className="space-y-4">
            {upcomingBookings.map((booking) => {
              const start = new Date(booking.tour.startDate || "");
              const end = new Date(booking.tour.endDate || "");
              const days = differenceInDays(end, start) + 1;
              return (
                <div key={booking._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{booking.tour.title}</h3>
                    <Badge
                      variant={
                        booking.status === "COMPLETE"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {booking.tour.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(start, "PP")} to {format(end, "PP")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {days} days
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {booking.guestCount} guests
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-semibold text-primary">
                      ${booking.tour.costFrom}
                    </span>
                    <div className="space-x-2 flex items-center">
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          to={`/tours/${booking.tour._id}`}
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        >
                          View
                        </Link>
                      </Button>
                      {booking.status !== "COMPLETE" && (
                        <Button
                          onClick={() => handleInitPayment(booking._id)}
                          size="sm"
                        >
                          {initPaymentLoading ? "Pay ....." : "Pay Booking"}
                        </Button>
                      )}
                      {booking.status === "COMPLETE" &&
                        (() => {
                          const isLoadingThisInvoice =
                            loadingInvoiceId === booking.payment;

                          return (
                            <Button
                              onClick={() =>
                                handleDownloadInvoice(booking.payment)
                              }
                              size="sm"
                              disabled={isDownloadingInvoice}
                            >
                              {isLoadingThisInvoice ? (
                                "Downloading ....."
                              ) : (
                                <Download />
                              )}
                            </Button>
                          );
                        })()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
