import { columns } from './columns';
import { getProducts } from './data';
import ProductsTable from './table';

const ProductsPage = async () => {
  const data = await getProducts();

  return (
    <div className="p-4">
      <ProductsTable columns={columns} data={data!} />
    </div>
  );
};

export default ProductsPage;
