import { columns } from "./components/columns";
import VoucherTable from "./components/table";
import { getVouchers } from "./data";

export default async function VouchersPage() {
  const vouchers = await getVouchers();

  return <VoucherTable columns={columns} data={vouchers || []} />;
}
