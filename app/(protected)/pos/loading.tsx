import { MapItems } from '@/lib/utils';
import { ProductCardSkeleton } from './pos-product-card-skeleton';

const Loading = () => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3">
      <MapItems
        of={Array.from({ length: 8 })}
        render={(_, index) => (
          <li key={`item-${index}`}>
            <ProductCardSkeleton />
          </li>
        )}
      />
    </ul>
  );
};

export default Loading;
