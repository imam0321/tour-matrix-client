import { TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";

interface ExcludedProps {
  excluded: string[];
}

export default function Excluded({ excluded }: ExcludedProps) {
  return (
    <TabsContent value="excluded" className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">What's Excluded</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {excluded.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <p className="text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
