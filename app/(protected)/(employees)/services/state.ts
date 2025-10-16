"use client";

import { atom, useAtom } from "jotai";
import type { ServiceData } from "./data";

export type ServiceID = Pick<ServiceData, "id">;
export type UpdateData = ServiceData;

type ServiceDialogState<T> = {
  open: "update" | "delete";
  data: T;
};

const serviceDialogAtom = (<T>() => atom<ServiceDialogState<T> | null>(null))();

export const useServiceDialog = <T>() => {
  const [serviceState, setServiceState] = useAtom(serviceDialogAtom);

  const close = () => {
    setServiceState(null);
  };

  return {
    serviceState: serviceState as ServiceDialogState<T> | null,
    close,
    setServiceState,
  };
};
