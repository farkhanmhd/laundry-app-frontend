import { PosProductCard } from "@/components/pos-product-card";
import { MapItems } from "@/lib/utils";
import { getProducts } from "./data";

const PosPage = async () => {
  const data = await getProducts();

  return (
    <MapItems
      of={data || []}
      render={(item) => (
        <li key={item.id}>
          <PosProductCard product={item} />
        </li>
      )}
    />
  );
};

export default PosPage;
