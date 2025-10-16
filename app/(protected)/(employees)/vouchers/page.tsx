import { columns } from "./columns";
import { getVouchers } from "./data";
import VoucherTable from "./table";

/**
 * The main page component for the /vouchers route.
 * It fetches voucher data on the server and passes it to the client component.
 */
export default async function VouchersPage() {
  const vouchers = await getVouchers();

  return <VoucherTable columns={columns} data={vouchers!} />;
}
