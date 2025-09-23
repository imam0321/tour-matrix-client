/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewCard {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  loading?: boolean;
}

interface Props {
  stats: OverviewCard[];
}

export default function OverviewCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(({ title, value, icon: Icon, color, loading }, idx) => (
        <Card
          key={idx}
          className="shadow-md hover:shadow-lg transition rounded-2xl"
        >
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {title}
            </CardTitle>
            {loading ? (
              <Skeleton className="h-4 w-4" />
            ) : (
              <Icon className="h-4 w-4 text-gray-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {loading ? <Skeleton className="h-8 w-16" /> : value}
            </div>
            <p className={`text-xs ${color}`}>
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Overview
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
