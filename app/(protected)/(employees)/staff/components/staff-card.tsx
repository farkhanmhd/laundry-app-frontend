import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Staff } from "../data";

type Props = {
  staff: Staff;
};

const StaffCard = ({ staff }: Props) => (
  <Link href={`/staff/${staff.id}`}>
    <Card className="bg-background dark:border-accent">
      <CardContent className="flex flex-col items-center gap-6">
        <Avatar className="size-32">
          <AvatarImage className="" src={staff.image!} />
          <AvatarFallback className="uppercase">
            {staff.username?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <CardFooter className="flex-col gap-1 text-sm">
          <span>{staff.username}</span>
          <span>{staff.email}</span>
          <span className="capitalize">{staff.name}</span>
        </CardFooter>
      </CardContent>
    </Card>
  </Link>
);

export default StaffCard;
