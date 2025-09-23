import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PaymentGateWayStat } from "@/types/stats.type";

interface Props {
  data: PaymentGateWayStat[];
  colors: string[];
  chartConfig: ChartConfig;
}

export default function PaymentsChart({
  data = [],
  colors,
  chartConfig,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments by Gateway</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max:h-80 w-full" config={chartConfig}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="_id"
                outerRadius="80%"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
