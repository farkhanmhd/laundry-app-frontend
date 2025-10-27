"use client";

import { atom, useAtom } from "jotai";
import type { Voucher } from "../data";

export type VoucherID = Pick<Voucher, "id">;
export type UpdateData = Voucher;

type VoucherDialogState<T> = {
  open: "update" | "delete";
  data: T;
};

const voucherDialogAtom = (<T>() => atom<VoucherDialogState<T> | null>(null))();

export const useVoucherDialog = <T>() => {
  const [voucherState, setVoucherState] = useAtom(voucherDialogAtom);

  const close = () => {
    setVoucherState(null);
  };

  return {
    voucherState: voucherState as VoucherDialogState<T> | null,
    close,
    setVoucherState,
  };
};
