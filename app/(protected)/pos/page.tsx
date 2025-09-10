import { delay, MapItems } from '@/lib/utils';
import { getProducts } from './data';
import { PosProductCard } from './pos-product-card';

const PosPage = async () => {
  await delay(2000);
  const data = await getProducts();

  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      <MapItems
        of={data!}
        render={(item) => (
          <li key={item.id}>
            <PosProductCard product={item} />
          </li>
        )}
      />
    </ul>
  );
};

export default PosPage;
