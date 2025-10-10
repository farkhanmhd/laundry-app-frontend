import { delay } from "@/lib/utils";
import { columns } from "./columns";
import { getProducts } from "./data";
import ProductsTable from "./table";

const ProductsPage = async () => {
  await delay(2000);
  const data = await getProducts();

  return (
    <div className="h-full p-4 lg:p-6">
      <ProductsTable columns={columns} data={data!} />
    </div>
  );
};

export default ProductsPage;
