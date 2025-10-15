import { columns } from "./columns";
import { getProducts } from "./data";
import ProductsTable from "./table";

const ProductsPage = async () => {
  const data = await getProducts();

  return <ProductsTable columns={columns} data={data!} />;
};

export default ProductsPage;
