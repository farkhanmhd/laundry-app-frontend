import { ScrollArea } from '@/components/ui/scroll-area';
import { delay } from '@/lib/utils';
import { columns } from './columns';
import { getProducts } from './data';
import ProductsTable from './table';

const ProductsPage = async () => {
  await delay(2000);
  const data = await getProducts();

  return (
    <ScrollArea className="max-h-[calc(100dvh-80px)]">
      <div className="p-4">
        <ProductsTable columns={columns} data={data!} />
      </div>
    </ScrollArea>
  );
};

export default ProductsPage;
