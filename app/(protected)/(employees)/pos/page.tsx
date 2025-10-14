import { delay, MapItems } from "@/lib/utils";
import { PosProductCard } from "../../../../components/pos-product-card";
import { getProducts } from "./data";

const PosPage = async () => {
  await delay(2000);
  const data = await getProducts();

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
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
