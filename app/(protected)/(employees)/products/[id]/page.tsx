import { notFound } from "next/navigation";
import { TabsContent } from "@/components/ui/tabs";
import { getProductById } from "../data";
import { ImageCard } from "./image-card";
import { ProductDataForm } from "./product-data-form";
import { QuantityAdjustForm } from "./quantity-adjust-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <TabsContent className="flex flex-col gap-6" value="data">
        <ProductDataForm
          defaultValues={{
            id: product.id,
            name: product.name,
            price: product.price,
            reorderPoint: product.reorderPoint,
          }}
        />
      </TabsContent>
      <TabsContent className="flex flex-col gap-6" value="qty">
        <QuantityAdjustForm
          currentQuantity={product.currentQuantity}
          productId={product.id}
        />
      </TabsContent>
      <TabsContent className="flex flex-col gap-6" value="image">
        <ImageCard
          image={product.image || "/placeholder.svg"}
          productId={product.id}
        />
      </TabsContent>
    </>
  );
}
