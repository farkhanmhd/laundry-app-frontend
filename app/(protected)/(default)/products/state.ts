import { atom, useAtom } from 'jotai';
import type { ProductData } from './data';

export type ProductID = Pick<ProductData, 'id'>;
export type UpdateData = Omit<ProductData, 'currentQuantity'>;
export interface UpdateQTY
  extends Pick<ProductData, 'id' | 'currentQuantity' | 'name'> {
  newQuantity: number;
  reason: string;
}

type ProductDialogState<T> = {
  open: 'update' | 'delete' | 'adjust';
  data: T;
};

const productDialogAtom = (<T>() => atom<ProductDialogState<T> | null>(null))();

export const useProductDialog = <T>() => {
  const [productState, setProductState] = useAtom(productDialogAtom);

  const close = () => {
    setProductState(null);
  };

  return {
    productState: productState as ProductDialogState<T> | null,
    close,
    setProductState,
  };
};
