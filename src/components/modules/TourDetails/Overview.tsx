import { TabsContent } from "@/components/ui/tabs";

interface IOverviewProps {
  description: string;
  included: string[];
  amenities: string[];
  tourType: string;
  division: string;
}

export default function Overview({
  description,
  included,
  amenities,
  tourType,
  division,
}: IOverviewProps) {
  return (
    <TabsContent value="overview" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
        <p className="text-muted-foreground leading-relaxed mb-2">
          {description}
        </p>

        <div className="flex justify-between items-center font-bold mb-4">
          <p>Tour Type: {tourType}</p>
          <p>Division: {division}</p>
        </div>

        <h3 className="text-xl font-semibold mb-3">Included</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {included.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <li className="flex items-start text-sm gap-2">
                <div className="w-2 h-2 bg-primary mt-1.5 rounded-full flex-shrink-0" />
                <p>{name}</p>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <li className="flex items-start text-sm gap-2">
                <div className="w-2 h-2 bg-blue-500 mt-1.5 rounded-full flex-shrink-0" />
                <p>{name}</p>
              </li>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}
