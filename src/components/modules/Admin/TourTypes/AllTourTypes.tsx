import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ITourTypeResponse } from "@/types";
import { PenIcon, Trash2 } from "lucide-react";
import ButtonModal from "../../Buttons/ButtonModal";

interface ITourTypeProps {
  isLoading: boolean;
  tourTypes?: ITourTypeResponse[];
  onEditTourType: (tourType: ITourTypeResponse) => void;
  onTourTypeDelete: (id: string) => void;
}

export default function AllTourTypes({
  isLoading,
  tourTypes,
  onEditTourType,
  onTourTypeDelete,
}: ITourTypeProps) {
  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={2}>
            <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        <>
          {!isLoading &&
            tourTypes?.map((tourType: ITourTypeResponse) => (
              <TableRow key={tourType._id}>
                <TableCell className="font-medium">{tourType?.name}</TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onEditTourType(tourType)}
                      className="bg-muted text-muted-foreground"
                    >
                      <PenIcon />
                    </Button>
                    <ButtonModal
                      actionName={
                        <Button size="sm">
                          <Trash2 />
                        </Button>
                      }
                      title="Delete Tour Type"
                      description="Are you sure delete this tour type?"
                      confirmHandler={onTourTypeDelete}
                      id={tourType._id}
                    ></ButtonModal>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </>
      )}
    </TableBody>
  );
}
