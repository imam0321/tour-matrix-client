import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <Card className="max-w-lg w-full shadow-lg rounded-2xl border bg-card text-card-foreground">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary mt-4">
            {message}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Transaction ID:</span>
            <span className="font-mono text-sm">{transactionId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-semibold text-primary">৳ {amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <Badge variant="secondary" className="capitalize bg-chart-2">
              {status}
            </Badge>
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate("/")} className="w-full md:w-auto">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
