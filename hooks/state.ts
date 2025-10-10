import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ProductData } from "@/app/(protected)/pos/data";

export interface PosProduct {
  quantity: number;
  product: ProductData;
}

export interface PosProductState {
  open: boolean;
  items: PosProduct[];
}

const posProductsAtom = atomWithStorage<PosProductState>(
  "pos-selected-products",
  {
    open: false,
    items: [],
  }
);

export const usePosProducts = () => {
  const [posProduct, setPosProduct] = useAtom(posProductsAtom);

  return { posProduct, setPosProduct };
};
