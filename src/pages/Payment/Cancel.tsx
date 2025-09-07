import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export default function Cancel() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status") || "cancelled";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <Card className="max-w-lg w-full shadow-lg rounded-2xl border bg-card text-card-foreground">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive mt-4">
            {message}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Transaction ID:</span>
            <span className="font-mono text-sm">{transactionId || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-semibold text-destructive">
              ৳ {amount || "0"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <Badge variant="destructive" className="capitalize">
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
