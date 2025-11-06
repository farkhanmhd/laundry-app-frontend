import { ProductDataFormSkeleton } from "./product-data-form-skeleton";

const Loading = () => (
  <div className="flex w-full max-w-3xl flex-2 flex-col gap-4 md:gap-6">
    <div className="flex flex-col gap-6">
      <ProductDataFormSkeleton />
    </div>
  </div>
);

export default Loading;
