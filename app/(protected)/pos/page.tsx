import { MapItems } from '@/lib/utils';
import { getProducts } from './data';
import { PosProductCard } from './pos-product-card';

const PosPage = async () => {
  const data = await getProducts();

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3">
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
