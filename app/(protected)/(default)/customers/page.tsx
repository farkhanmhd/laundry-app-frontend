import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./columns";
import { getCustomers } from "./data";
import CustomersTable from "./table";

const CustomerPage = async () => {
  const customers = await getCustomers();

  return (
    <ScrollArea className="max-h-[calc(100dvh-80px)]">
      <div className="p-4">
        <CustomersTable columns={columns} data={customers!} />
      </div>
    </ScrollArea>
  );
};

export default CustomerPage;
