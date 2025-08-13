import type { IDivisionResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PenIcon, Trash2 } from "lucide-react";
import ButtonModal from "../../Buttons/ButtonModal";

interface IDivisionProps {
  isLoading: boolean;
  divisions?: IDivisionResponse[];
  onEditDivision: (division: IDivisionResponse) => void;
  onDivisionDelete: (id: string) => void;
}

export default function Division({
  isLoading,
  divisions,
  onEditDivision,
  onDivisionDelete,
}: IDivisionProps) {
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
          {
            divisions?.map((division: IDivisionResponse) => (
              <TableRow key={division._id}>
                <TableCell>
                  <img
                    src={division.thumbnail || "Division"}
                    alt="DV"
                    className="w-12 h-12 object-cover rounded border"
                  />
                </TableCell>
                <TableCell>{division?.name}</TableCell>
                <TableCell>{division?.slug}</TableCell>
                <TableCell className="whitespace-normal ">
                  {division?.description}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onEditDivision(division)}
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
                      confirmHandler={onDivisionDelete}
                      id={division._id}
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
