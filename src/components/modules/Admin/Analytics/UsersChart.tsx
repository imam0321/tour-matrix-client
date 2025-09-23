import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { UserRoleStat } from "@/types/stats.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  data?: UserRoleStat[];
  colors: string[];
  chartConfig: ChartConfig;
  isLoading?: boolean;
}

export default function UsersChart({
  data = [],
  colors,
  chartConfig,
  isLoading = false,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by Role</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || data.length === 0 ? (
          <Skeleton className="max:h-80 w-full" />
        ) : (
          <ChartContainer className="w-full max:h-80" config={chartConfig}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="_id"
                outerRadius="80%"
                label={({ name, percent }) =>
                  `${name.split(" ").slice(0, 2).join(" ")} ${(
                    percent * 100
                  ).toFixed(0)}%`
                }
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
