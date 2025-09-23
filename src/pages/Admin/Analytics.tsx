/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserStatQuery,
  useGetTourStatQuery,
  useGetBookingStatQuery,
  useGetPaymentStatQuery,
} from "@/redux/features/stats/stats";
import OverviewCards from "@/components/modules/Admin/Analytics/OverviewCards";
import UsersChart from "@/components/modules/Admin/Analytics/UsersChart";
import BarChartCard from "@/components/modules/Admin/Analytics/BarChartCard";
import PaymentsChart from "@/components/modules/Admin/Analytics/PaymentsChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, Users } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"];
const chartConfig = { main: { label: "Value", color: "var(--chart-1)" } };

export default function Analytics() {
  const { data: user, isLoading: userLoading } = useGetUserStatQuery(undefined);
  const { data: tour, isLoading: tourLoading } = useGetTourStatQuery(undefined);
  const { data: booking, isLoading: bookingLoading } = useGetBookingStatQuery(undefined);
  const { data: payment, isLoading: paymentLoading } = useGetPaymentStatQuery(undefined);

  const userStats = user?.data;
  const tourStats = tour?.data;
  const bookingStats = booking?.data;
  const paymentStats = payment?.data;

  const bookingsPerTour =
    bookingStats?.bookingsPerTour?.map((b: any) => ({
      name: b.tour?.title || "Unknown Tour",
      count: b.bookingCount || 0,
    })) || [];

  const overviewStats = [
    {
      title: "Total Users",
      value: userStats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
      loading: userLoading,
    },
    {
      title: "Total Tours",
      value: tourStats?.totalTours || 0,
      icon: Calendar,
      color: "text-green-600",
      loading: tourLoading,
    },
    {
      title: "Total Bookings",
      value: bookingStats?.totalBookings || 0,
      icon: Calendar,
      color: "text-purple-600",
      loading: bookingLoading,
    },
    {
      title: "Avg Payment",
      value: `$${
        paymentStats?.avgPaymentAmount?.[0]?.avgPaymentAmount?.toFixed(2) || 0
      }`,
      icon: DollarSign,
      color: "text-yellow-600",
      loading: paymentLoading,
    },
  ];

  return (
    <div className="min-h-screen w-full mx-auto flex flex-col">
      <main className="flex-1 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="md:text-3xl text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Track all users, tours, bookings, and payments in one place.
          </p>

          {/* Overview Cards */}
          <OverviewCards stats={overviewStats} />

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Users Chart */}
            {userLoading ? (
              <Skeleton className="max:h-80 w-full" />
            ) : (
              <UsersChart
                data={userStats?.usersByRole || []}
                colors={COLORS}
                  chartConfig={chartConfig}
                  isLoading={userLoading}
              />
            )}

            {/* Tours by Type */}
            {tourLoading ? (
              <Skeleton className="max:h-80 w-full" />
            ) : (
              <BarChartCard
                title="Tours by Type"
                data={tourStats?.totalTourByTourTypes?.map((t: any) => ({
                  ...t,
                  count: t.count || 0,
                })) || []}
                dataKey="_id"
                chartConfig={chartConfig}
              />
            )}

            {/* Bookings per Tour */}
            {bookingLoading ? (
              <Skeleton className="max:h-80 w-full" />
            ) : bookingsPerTour.length === 0 ? (
              <Skeleton className="max:h-80 w-full" />
            ) : (
              <BarChartCard
                title="Bookings per Tour"
                data={bookingsPerTour}
                dataKey="name"
                chartConfig={chartConfig}
              />
            )}

            {/* Payments Chart */}
            {paymentLoading ? (
              <Skeleton className="max:h-80 w-full" />
            ) : (
              <PaymentsChart
                data={paymentStats?.paymentGateWayData || []}
                colors={COLORS}
                chartConfig={chartConfig}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
