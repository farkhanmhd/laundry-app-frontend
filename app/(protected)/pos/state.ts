import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { ProductData } from './data';

export interface PosProduct {
  quantity: number;
  product: ProductData;
}

const posProductsAtom = atomWithStorage<PosProduct[]>(
  'pos-selected-products',
  []
);

export const usePosProducts = () => {
  const [posProduct, setPosProduct] = useAtom(posProductsAtom);

  return { posProduct, setPosProduct };
};
