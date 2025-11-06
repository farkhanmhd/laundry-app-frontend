import { format } from "date-fns";
import { Calendar } from "lucide-react";

export function CurrentDate() {
  return (
    <div className="flex h-12 items-center gap-2 rounded-full bg-background pr-4 pl-2">
      <div className="rounded-full bg-primary/10 p-1.5">
        <Calendar className="text-primary" />
      </div>
      <span>{format(new Date(), "eee, dd MMMM yyyy")}</span>
    </div>
  );
}
