import { MapItems } from "@/lib/utils";
import { ProductCardSkeleton } from "./pos-product-card-skeleton";

const Loading = () => (
  <MapItems
    of={Array.from({ length: 8 })}
    render={(_, index) => (
      <li key={`item-${index}`}>
        <ProductCardSkeleton />
      </li>
    )}
  />
);

export default Loading;
