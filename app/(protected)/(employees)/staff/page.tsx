import { columns } from "./components/columns";
import VoucherTable from "./components/table";
import { getStaffs } from "./data";

/**
 * The main page component for the /vouchers route.
 * It fetches voucher data on the server and passes it to the client component.
 */
export default async function StaffsPage() {
  const staffs = await getStaffs();

  return <VoucherTable columns={columns} data={staffs!} />;
}
