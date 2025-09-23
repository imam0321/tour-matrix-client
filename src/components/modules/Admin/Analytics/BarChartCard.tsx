import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface BarData {
  [key: string]: string | number;
  count: number;
}

interface Props {
  title?: string;
  data: BarData[];
  dataKey: string;
  chartConfig: ChartConfig;
}

export default function BarChartCard({ title, data = [], dataKey, chartConfig}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
          <ChartContainer className="max:h-80 w-full" config={chartConfig}>
            <BarChart data={data} margin={{ top: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={dataKey} tickLine={false} tickMargin={5} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--chart-1)" radius={8} />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
