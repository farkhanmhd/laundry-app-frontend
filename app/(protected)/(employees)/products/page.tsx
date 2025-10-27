import { columns } from "./components/columns";
import ProductsTable from "./components/table";
import { getProducts } from "./data";

const ProductsPage = async () => {
  const data = await getProducts();

  return <ProductsTable columns={columns} data={data!} />;
};

export default ProductsPage;
